import { 
  GET_NUTRIENTS, 
  SET_NUTRIENTS_OF_INTEREST
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
    case SET_NUTRIENTS_OF_INTEREST:
    return {
      ...state,
      nutrientsOfInterest: action.nutrientsOfInterest,
    };
    default:
      return state;
  }
};

export default nutrientsOfInterest;