import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { getAllNutrients } from '../actions/nutrientsofinterest.js';

// These are the elements needed by this element.
import { addToCartIcon } from './my-icons.js';

// These are the elements needed by this element.
import './nutrientsofinterest-item.js'; // NB this was not in the original PWA STARTER KIT CODE...am I ruining some kind of lazy behavior here???

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';

class NutrientsOfInterestNutrients extends connect(store)(LitElement) {
  render() {
    const {_nutrients} = this;
    return html`
      ${ButtonSharedStyles}
      <style>
        :host { display: block; }
      </style>
      ${Object.keys(_nutrients).map((key) => {
        const item = _nutrients[key];
        return html`
          <div>
             <nutrientsofinterest-item name="${item.title}" amount="${item.inventory}" price="${item.price}"></nutrientsofinterest-item>
             //   <!-- @click="${(e) => store.dispatch(addToCart(e.currentTarget.dataset['index']))}" -->
            <button
              .disabled="${item.inventory === 0}"
                data-index$="${item.id}"
                title="${item.inventory === 0 ? 'Sold out' : 'Add to cart' }">
              ${item.inventory === 0 ? 'Sold out': addToCartIcon }
            </button>
           </div>
        `
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
}

window.customElements.define('nutrientsofinterest-nutrients', NutrientsOfInterestNutrients);
