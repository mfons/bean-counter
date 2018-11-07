import { 
    SEARCH_FOR_FOODS_BY_STRING,
    GET_NUTRIENTS_FOR_A_FOOD
} from '../actions/food.js';
import { createSelector } from 'reselect';

const food = 
(state = {latestFoodList:[], latestFoodMap: {}, latestQueryBroughtBackNoFoodList: true, latestFoodListQueryString: '' }, action) => {
  switch (action.type) {
    case SEARCH_FOR_FOODS_BY_STRING:
    return {
      ...state,
      latestFoodList: action.latestFoodList,
      latestFoodMap: action.latestFoodMap,
      latestQueryBroughtBackNoFoodList: action.latestQueryBroughtBackNoFoodList,
      latestFoodListQueryString: action.latestFoodListQueryString
    };
    case GET_NUTRIENTS_FOR_A_FOOD:
    return {
      ...state,
      latestFoodNutrientsList: action.latestFoodNutrientsList,
      latestFoodNutrientsMap: action.latestFoodNutrientsMap,
      latestQueryBroughtBackNoFoodNutrientsList: action.latestQueryBroughtBackNoFoodNutrientsList,
      latestFoodNutrientsNdbno: action.latestFoodNutrientsNdbno,
      latestFoodNutrientInfo: action.latestFoodNutrientInfo
    };
    default:
      return state;
  }
};

export default food;

// Per Redux best practices, the shop data in our store is structured
// for efficiency (small size and fast updates).
//
// The _selectors_ below transform store data into specific forms that
// are tailored for presentation. Putting this logic here keeps the
// layers of our app loosely coupled and easier to maintain, since
// views don't need to know about the store's internal data structures.
//
// We use a tiny library called `reselect` to create efficient
// selectors. More info: https://github.com/reduxjs/reselect.

// const nutrientsOfInterestSelector = state => state.nutrientsOfInterest.nutrientsOfInterest;
// const nutrientsSelector = state => state.nutrientsOfInterest.nutrients;

// // Return a flattened array representation of the items in the cart
// export const nutrientsOfInterestItemsSelector = createSelector(
//   nutrientsOfInterestSelector,
//   nutrientsSelector,
//   (nutrientsOfInterest, nutrients) => {
//     const items = [];
//     for (let id of nutrientsOfInterest) {
//       const item = nutrients[id];
//       items.push({id: item.id, name: item.name});
//     }
//     return items;
//   }
// );

// // Return the total cost of the items in the cart
// export const nutrientsOfInterestTotalSelector = createSelector(
//   nutrientsOfInterestSelector,
//   nutrientsSelector,
//   (nutrientsOfInterest, nutrients) => {
//     let total = 0;
//     for (let id of nutrientsOfInterest) {
//       const item = nutrients[id];
//       total += 1;
//     }
//     return total;
//   }
// );

