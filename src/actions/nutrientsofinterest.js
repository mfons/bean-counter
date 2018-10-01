export const GET_NUTRIENTS = 'GET_NUTRIENTS';
export const SET_NUTRIENTS_OF_INTEREST = 'SET_NUTRIENTS_OF_INTEREST';

const NUTRIENTS_LIST = [
    {"id": 1, "title": "Cabot Creamery Extra Sharp Cheddar Cheese", "price": 10.99, "inventory": 2},
    {"id": 2, "title": "Cowgirl Creamery Mt. Tam Cheese", "price": 29.99, "inventory": 10},
    {"id": 3, "title": "Tillamook Medium Cheddar Cheese", "price": 8.99, "inventory": 5},
    {"id": 4, "title": "Point Reyes Bay Blue Cheese", "price": 24.99, "inventory": 7},
    {"id": 5, "title": "Shepherd's Halloumi Cheese", "price": 11.99, "inventory": 3}
  ];
  
  const _goGetAllNutrients = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var myInit = { method: 'GET',
                  headers: myHeaders,
                  mode: 'cors',
                  cache: 'default' };

    var myRequest = new Request('https://api.nal.usda.gov/ndb/list?format=json&lt=nr&max=300&sort=n&api_key=JrBeMt1k9YsrhBrqfbt2GmmQJAu7XVgt3ttjAxJt');

    return fetch(myRequest /*,myInit*/).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    });
  }

  export const getAllNutrients = () => (dispatch, getState) => {
    // Here you would normally get the data from the server. We're simulating
    // that by dispatching an async action (that you would dispatch when you
    // succesfully got the data back)
    _goGetAllNutrients().then((data) => {
      console.log("nc-ajax-get-possible-nutrients._tasksLoaded() data was: ", data);
      let nutrients = {};
      if (typeof data.list !== 'undefined' && typeof data.list.item !== 'undefined') {
          // You could reformat the data in the right format as well:
          nutrients = data.list.item.reduce((obj, nutrient) => {
            obj[nutrient.id] = nutrient;
            return obj
          }, {});
      }
      else if (typeof data.errors !== "undefined" && data.errors.error[0].status === 400) {
      }
      dispatch({
        type: GET_NUTRIENTS,
        nutrients: nutrients
      });
    })
    .catch((error) => {
      console.warn('There has been a problem with your fetch operation: ', error.message);
    });
  };

  export const setNutrientsOfInterest = (selectedNutrients) => (dispatch, getState) =>{
    const state = getState();
    dispatch(setNutrientsOfInterestUnsafe(selectedNutrients));
  };
  
  export const setNutrientsOfInterestUnsafe = (nutrientsOfInterest) => {
    return {
      type: SET_NUTRIENTS_OF_INTEREST,
      nutrientsOfInterest
    };
  };


  