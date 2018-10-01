import { PolymerElement } from '../../@polymer/polymer/polymer-element.js';
import '../../@polymer/iron-ajax/iron-ajax.js';
import { store } from '../store.js';
import { html } from '../../@polymer/polymer/lib/utils/html-tag.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// TODO we need to actually do this in the redux action thingy (using fetch api?)
// instead of using iron-ajax...maybe get iron-ajax working first since it seems
// like any other component...then migrate to use of the redux action for getting
// the list of possible nutrients.

// These are the actions needed by this element.
import { getAllNutrients, setNutrientsOfInterest } from '../actions/nutrientsofinterest.js';

class BcAjaxGetPossibleNutrients extends connect(store)(LitElement) {
  static get template() {
    return html`
        <style>
            :host {
                display: none;
            }
        </style>
        <iron-ajax id="ajaxNutrientsList" method="GET" url="https://api.nal.usda.gov/ndb/list?format=json&amp;lt=nr&amp;max=300&amp;sort=n&amp;api_key=JrBeMt1k9YsrhBrqfbt2GmmQJAu7XVgt3ttjAxJt" handle-as="json" on-response="_tasksLoaded">
        </iron-ajax>
`;
  }

  static get is() { return 'bc-ajax-get-possible-nutrients'; }

  static get properties() {
      return {
          possibleNutrients: {
              type: Array
          },
      };
  }

//   static get actions() {
//       return {
//           loadAllNutrients: (allNutrients) => {
//               return {
//                   type: 'LOAD_ALL_NUTRIENTS',
//                   nutrients: allNutrients
//               }
//           },
//       };
//   }

//   static get observers() {
//       return []
//   }

//   ready() {
//       super.ready();
//       this.getNutrientsFromUSDA();
//   }

firstUpdated() {
    super.ready();
    this.getNutrientsFromUSDA();
    //store.dispatch(getAllNutrients());
  }

  // This is called every time something is updated in the store.
  _stateChanged(state) {
      // TODO
    //this._nutrients = state.nutrientsOfInterest.nutrients;
  }


  // TODO?? does this need any changes
  getNutrientsFromUSDA() {
      console.info("bc-ajax-get-possible-nutrients about to request all possible nutrients from usda food db");
      if (this.possibleNutrients && this.possibleNutrients.length > 0) {
          return;
      }
      this.$.ajaxNutrientsList.generateRequest();
  }

  // TODO?? does this need any changes?
  _tasksLoaded(data) {
      console.log("nc-ajax-get-possible-nutrients._tasksLoaded() data was: ", data.detail.response);
      if (typeof data.detail.response.list !== 'undefined' &&
          typeof data.detail.response.list.item !== 'undefined') {
          this.dispatch('loadAllNutrients', data.detail.response.list.item);
      }
      else if (typeof data.detail.response.errors !== "undefined" && data.detail.response.errors.error[0].status === 400) {
          this.dispatch('loadAllNutrients', []);
      }
  }
}

window.customElements.define(BcAjaxGetPossibleNutrients.is, BcAjaxGetPossibleNutrients);
