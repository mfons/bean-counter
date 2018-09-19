import { GET_NUTRIENTS } from '../actions/nutrientsofinterest.js';
import { createSelector } from 'reselect';

const nutrientsOfInterest = (state = {nutrients: {}}, action) => {
  switch (action.type) {
    case GET_NUTRIENTS:
    return {
        ...state,
        nutrients: action.nutrients
      };
    default:
      return state;
  }
};

export default nutrientsOfInterest;