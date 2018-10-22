import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

import '@polymer/paper-input/paper-input.js';
//import '@polymer/iron-input/iron-input.js';
// Elements needed by this element
//import {Formfield} from "@material/mwc-formfield"

//import {MDCTextField} from '@material/textfield';

class BcEat extends PageViewElement {
  render() {  
    //const textField = new MDCTextField(document.querySelector('.mdc-text-field'));
    return html`
      ${SharedStyles}
      <section>
        <h2>2. Eat!</h2>
        <p>After you specify your nutrients of interest, here is where you can record what you have eaten or see what
            nutritional impact a certain kind of food would have on your food intake...
        </p>
        <paper-input always-float-label label="Search for food items..."></paper-input>
      </section>
    `;
    // <mwc-formfield alignend label="Search for a food:"></mwc-formfield>
    // <script type="module" src="../../node_modules/@material/mwc-formfield/mwc-formfield.js">
    
    // <div class="mdc-text-field">
    // <input type="text" id="my-text-field" class="mdc-text-field__input">
    // <label class="mdc-floating-label" for="my-text-field">Hint text</label>
    // <div class="mdc-line-ripple"></div>
    // </div>
  }
}

window.customElements.define('bc-eat', BcEat);
