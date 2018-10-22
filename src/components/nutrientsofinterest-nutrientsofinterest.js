import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the elements needed by this element.
import { minusIcon } from './my-icons.js';
import './nutrientsofinterest-item.js';

// These are the actions needed by this element.
import { removeNutrientOfInterest } from '../actions/nutrientsofinterest.js';
import { 
  updateUser,
  updateOffline
 } from '../actions/app.js'

// These are the reducers needed by this element.
import {
  nutrientsOfInterestItemsSelector,
  nutrientsOfInterestTotalSelector
} from '../reducers/nutrientsofinterest.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';

class NutrientsOfInterestNutrientsOfInterest extends connect(store)(LitElement) {
  render() {
    const { _items, _total, _offline } = this;
    return html`
      ${ButtonSharedStyles}
      <style>
        :host { display: block; }

        .offline-thingy {
          border: 1px green solid;
          border-radius: 50%;
          margin: 0 2%;
          padding: 10% 10%;
          color: green;
          background-color: #001000;
          width: 200px;
          height: 200px;
        }
      </style>
      <p ?hidden="${!_offline}" class="offline-thingy">Off-line: &nbsp;any changes will save once back on-line.</p>
      <p ?hidden="${_items.length !== 0}">(To use this program, you must still choose some nutrients that you are interested in...)</p>
      ${_items.map((item) =>
        html`
          <div>
            <nutrientsofinterest-item name="${item.name}"></nutrientsofinterest-item>
            <button 
                @click="${(e) => store.dispatch(removeNutrientOfInterest(e.currentTarget.dataset['index'], this._user))}"
                data-index="${item.id}"
                title="Remove this nutrient from list...">
              ${minusIcon}
            </button>
          </div>
        `
      )}
      <p ?hidden="${!_items.length}"><b>Total:</b> ${_total}</p>
    `;
  }

  static get properties() {
    return {
      _items: { type: Array },
      _total: { type: Number },
      _user: { type: Object },
      _offline: { type: Boolean }
    }
  }

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._items = nutrientsOfInterestItemsSelector(state);
    this._total = nutrientsOfInterestTotalSelector(state);
    this._user = state.app.user;
    this._offline = state.app.offline;
  }

  firstUpdated() {
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
  }

  connectedCallback() {
    super.connectedCallback();
    this.auth = firebase.auth();
    this.auth.onAuthStateChanged(user => {
      this._user = user;
      store.dispatch(updateUser(this._user));
    });
  }
}

window.customElements.define('nutrientsofinterest-nutrientsofinterest', NutrientsOfInterestNutrientsOfInterest);
