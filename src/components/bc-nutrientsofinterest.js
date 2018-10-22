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
import './nutrientsofinterest-nutrientsofinterest.js'

// These are the actions needed by this element.
import { updateUser } from '../actions/app.js'

class BcNutrientsOfInterest extends connect(store)(PageViewElement) {
  render() {
    return html`
       ${SharedStyles}
      <section>
        <h2>1. What Nutrients do you want to Track?</h2>
        <p>This program lets you enter and store food, and to monitor and know what nutrients you are putting in your body. So this
          page is the first thing you need to do to use this program.</p>
      </section>
      <h2>Nutrients Of Interest</h2>
      <h3>Currently Chosen Nutrients</h3>
      <nutrientsofinterest-nutrientsofinterest></nutrientsofinterest-nutrientsofinterest>
      
      <h3>Choose from All Available Nutrients</h3>
      <nutrientsofinterest-nutrients></nutrientsofinterest-nutrients>
    `
  }

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    // this._quantity = cartQuantitySelector(state);
    this._error = state.nutrientsOfInterest.error;
    this._user = state.app.user;
  }

  static get properties() {
    return {
      _user: { type: Object }
    }
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

window.customElements.define('bc-nutrientsofinterest', BcNutrientsOfInterest);
