import { 
  GET_NUTRIENTS, 
  ADD_NUTRIENT_OF_INTEREST,
  REMOVE_NUTRIENT_OF_INTEREST
} from '../actions/nutrientsofinterest.js';
import { createSelector } from 'reselect';

const nutrientsOfInterest = 
(state = {nutrients: {}, nutrientsOfInterest: []}, action) => {
  switch (action.type) {
    case GET_NUTRIENTS:
    return {
      ...state,
      nutrients: action.nutrients
    };
    case ADD_NUTRIENT_OF_INTEREST:
    return {
      ...state,
      nutrientsOfInterest: [
        ...state.nutrientsOfInterest, 
        action.nutrientOfInterest
      ],
    };
    case REMOVE_NUTRIENT_OF_INTEREST:
    return {
      ...state,
      nutrientsOfInterest: 
        state.nutrientsOfInterest
        .filter(noi => noi !== action.nutrientOfInterest),
    };
    default:
      return state;
  }
};

export default nutrientsOfInterest;

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

const nutrientsOfInterestSelector = state => state.nutrientsOfInterest.nutrientsOfInterest;
const nutrientsSelector = state => state.nutrientsOfInterest.nutrients;

// Return a flattened array representation of the items in the cart
export const nutrientsOfInterestItemsSelector = createSelector(
  nutrientsOfInterestSelector,
  nutrientsSelector,
  (nutrientsOfInterest, nutrients) => {
    const items = [];
    for (let id of nutrientsOfInterest) {
      const item = nutrients[id];
      items.push({id: item.id, name: item.name});
    }
    return items;
  }
);

// Return the total cost of the items in the cart
export const nutrientsOfInterestTotalSelector = createSelector(
  nutrientsOfInterestSelector,
  nutrientsSelector,
  (nutrientsOfInterest, nutrients) => {
    let total = 0;
    for (let id of nutrientsOfInterest) {
      const item = nutrients[id];
      total += 1;
    }
    return total;
  }
);

