export const GET_NUTRIENTS = 'GET_NUTRIENTS';
export const ADD_NUTRIENT_OF_INTEREST = 'ADD_NUTRIENT_OF_INTEREST';
export const REMOVE_NUTRIENT_OF_INTEREST = 'REMOVE_NUTRIENT_OF_INTEREST';

const _goGetAllNutrients = () => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
  };

  var myRequest = new Request('https://api.nal.usda.gov/ndb/list?format=json&lt=nr&max=300&sort=n&api_key=JrBeMt1k9YsrhBrqfbt2GmmQJAu7XVgt3ttjAxJt');

  return fetch(myRequest /*,myInit*/).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  });
}

const _goGetNutrientsOfInterestFromFirebase = (user) => {
  const db = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  db.settings(settings);
  return db.collection("users").doc(user.uid).collection("nutrientsOfInterest").get();
}

const _updateFirebaseNutrientsOfInterest = (user, nutrientOfInterest, nutrients, updateType) => {
  const db = firebase.firestore();
  // only need to do the setting once in the code?
  const settings = { timestampsInSnapshots: true };
  db.settings(settings);

  const userDocRef = db.collection("users").doc(user.uid);
  userDocRef.set({
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid
  })
    .then(function () {
      console.log("Document written with ID: ", userDocRef.id);
      if (updateType === 'add') {
        userDocRef
          .collection("nutrientsOfInterest")
          .doc(nutrientOfInterest)
          .set(Object.assign({}, nutrients[nutrientOfInterest], { timestamp: firebase.firestore.FieldValue.serverTimestamp() }))
          .then(docRef => console.info("successfully added nutrient of interest from firebase", nutrients[nutrientOfInterest].name));
      }
      if (updateType === 'remove') {
        userDocRef.collection("nutrientsOfInterest")
          .doc(nutrientOfInterest)
          .delete()
          .then(() => console.info("successfully deleted nutrient of interest from firebase", nutrients[nutrientOfInterest].name));
      }
    })
    .catch(function (error) {
      console.error("Error processing document: ", error);
    });
}

export const getAllNutrients = () => (dispatch, getState) => {
  // Here you would normally get the data from the server. We're simulating
  // that by dispatching an async action (that you would dispatch when you
  // succesfully got the data back)
  _goGetAllNutrients()
    .then((data) => {
      console.log("nc-ajax-get-possible-nutrients._tasksLoaded() data was: ", data);
      let nutrients = {};
      if (typeof data.list !== 'undefined' && typeof data.list.item !== 'undefined') {
        // You could reformat the data in the right format as well:
        nutrients = data.list.item
          .filter(nutrient => !nutrient.name.match(/^\d/))
          .reduce((obj, nutrient) => {
            obj[nutrient.id] = nutrient;
            return obj
          }, {});
        dispatch({
          type: GET_NUTRIENTS,
          nutrients: nutrients
        });
        _goGetNutrientsOfInterestFromFirebase(getState().app.user)
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              dispatch({
                type: ADD_NUTRIENT_OF_INTEREST,
                nutrientOfInterest: doc.data().id
              });
            });
          });
      }
      else if (typeof data.errors !== "undefined" && data.errors.error[0].status === 400) {
      }
    })
    .catch((error) => {
      console.warn('There has been a problem with your fetch operation: ', error.message);
    });
};

export const addNutrientOfInterest = (nutrientOfInterest, user) => (dispatch, getState) => {
  _updateFirebaseNutrientsOfInterest(user, nutrientOfInterest, getState().nutrientsOfInterest.nutrients, 'add');
  dispatch({
    type: ADD_NUTRIENT_OF_INTEREST,
    nutrientOfInterest
  });
};

export const removeNutrientOfInterest = (nutrientOfInterest, user) => (dispatch, getState) => {
  _updateFirebaseNutrientsOfInterest(user, nutrientOfInterest, getState().nutrientsOfInterest.nutrients, 'remove');
  dispatch({
    type: REMOVE_NUTRIENT_OF_INTEREST,
    nutrientOfInterest
  });
};


