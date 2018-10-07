import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
//import '@polymer/iron-list/iron-list.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

import './nutrientsofinterest-item.js';

// These are the actions needed by this element.
import { 
  getAllNutrients, 
  addNutrientOfInterest 
} from '../actions/nutrientsofinterest.js';

// These are the elements needed by this element.
import { plusIcon } from './my-icons.js';

// These are the elements needed by this element.
import './nutrientsofinterest-item.js'; 
//import './bc-ajax-get-possible-nutrients.js'; 

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';

class NutrientsOfInterestNutrients extends connect(store)(LitElement) {
  render() {
     return html`
      ${ButtonSharedStyles}
      <style>
        :host { display: block; }
       </style>

      <!--bc-ajax-get-possible-nutrients>
      </bc-ajax-get-possible-nutrients-->

      ${Object.values(this._nutrients)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((item) => {
        return html`
          <div>
             <nutrientsofinterest-item name="${item.name}" ></nutrientsofinterest-item>
            <button
              .disabled="${false}"
                data-index="${item.id}"
                title="${item.name}"
                @click="${(e) => store.dispatch(addNutrientOfInterest(e.currentTarget.dataset['index']))}">
              ${plusIcon }
            </button>
           </div>
        `;
      })}
    `;
  }

  static get properties() { return {
    _nutrients: { type: Object}
  }}

  firstUpdated() {
    store.dispatch(getAllNutrients());
  }

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._nutrients = state.nutrientsOfInterest.nutrients;
  }

  _computedClass(isSelected, currentItemName) {
    if (this._stringDoesNotBeginWithANumber(currentItemName)) {
      return 'hide-item';
    }
      var classes = 'item';
    if (isSelected) {
      classes += ' selected';
    }
    return classes;
  }

}

window.customElements.define('nutrientsofinterest-nutrients', NutrientsOfInterestNutrients);
