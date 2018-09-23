import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
// This element is connected to the Redux store.
import { store } from '../store.js';

// We are lazy loading its reducer.
import nutrientsOfInterest from '../reducers/nutrientsofinterest.js';
store.addReducers({
  nutrientsOfInterest
});

// These are the elements needed by this element.
import './nutrientsofinterest-nutrients.js';

class BcNutrientsOfInterest extends connect(store)(PageViewElement) {
  render() {
    return html`
      ${SharedStyles}
      <section>
        <h2>1. What Nutrients do you want to Track?</h2>
        <p>This program lets you enter and store food, and
        to monitor and know what nutrients you are putting
        in your body.  So this page is the first thing
        you need to do to use this program.</p>
      </section>
      <h3>Nutrients Of Interest</h3>
      <nutrientsofinterest-nutrients></nutrientsofinterest-nutrients>
    `
  }

    // This is called every time something is updated in the store.
    _stateChanged(state) {
      // this._quantity = cartQuantitySelector(state);
       this._error = state.nutrientsOfInterest.error;
    }
  
}

window.customElements.define('bc-nutrientsofinterest', BcNutrientsOfInterest);
