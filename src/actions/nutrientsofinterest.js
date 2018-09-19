export const GET_NUTRIENTS = 'GET_NUTRIENTS';

const NUTRIENTS_LIST = [
    {"id": 1, "title": "Cabot Creamery Extra Sharp Cheddar Cheese", "price": 10.99, "inventory": 2},
    {"id": 2, "title": "Cowgirl Creamery Mt. Tam Cheese", "price": 29.99, "inventory": 10},
    {"id": 3, "title": "Tillamook Medium Cheddar Cheese", "price": 8.99, "inventory": 5},
    {"id": 4, "title": "Point Reyes Bay Blue Cheese", "price": 24.99, "inventory": 7},
    {"id": 5, "title": "Shepherd's Halloumi Cheese", "price": 11.99, "inventory": 3}
  ];
  
  export const getAllNutrients = () => (dispatch, getState) => {
    // Here you would normally get the data from the server. We're simulating
    // that by dispatching an async action (that you would dispatch when you
    // succesfully got the data back)
  
    // You could reformat the data in the right format as well:
    const nutrients = NUTRIENTS_LIST.reduce((obj, nutrient) => {
      obj[nutrient.id] = nutrient;
      return obj
    }, {});
  
    dispatch({
      type: GET_NUTRIENTS,
      nutrients: nutrients
    });
  };

