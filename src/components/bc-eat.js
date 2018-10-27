import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { 
    searchForFoodsByString 
} from '../actions/food.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { localDining, clearIcon } from './my-icons.js'

import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-button/paper-button.js';
//import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icon/iron-icon.js';
import './my-icons.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-styles/color.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-dialog/paper-dialog.js';
//import '../../node_modules/web-animations-js/web-animations.min.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
//import '@polymer/iron-input/iron-input.js';
// Elements needed by this element
//import {Formfield} from "@material/mwc-formfield"

//import {MDCTextField} from '@material/textfield';

class BcEat extends connect(store)(PageViewElement) {
    render() {
        //const textField = new MDCTextField(document.querySelector('.mdc-text-field'));
        return html`
      ${SharedStyles}
      <style >
                .item.selected {
                    background: black;
                    color: white;
                }

                .item {
                    background: white;
                    padding: 10px;
                    border-bottom: 1px solid #ccc;
                }

                iron-list {
                    height: 72vh;
                    /* don't use % values unless the parent element is sized. */
                    width: 75vw;
                }

                .yellow-button {
                    text-transform: none;
                    color: #eeff41;
                }

                paper-icon-button.blue,
                paper-button.blue,
                button.blue {
                    --paper-icon-button-ink-color: var(--paper-black-500);
                    background-color: var(--paper-light-blue-500);
                    color: white;
                    border-radius: 3px;
                    padding: 2px;
                }

                .gram-weight-field {
                    width: 80px;
                    margin-left: 3px;
                }
      </style>
      <section>
        <h2>2. Eat!</h2>
        <p>After you specify your nutrients of interest, here is where you can record what you have eaten or see what
            nutritional impact a certain kind of food would have on your food intake...
        </p>
        <iron-form id="presubmit">
            <form method="get" action="/">
                <paper-input id="foodFluidSearchStringId" @tap="${this._onSearchStringTap}" name="foodFluidSearch" label="1. Search for a Food" @value-changed="${this._modifyFoodFluidSearchString}" required="" autocapitalize="off" spellcheck="true" @blur="${this._getFoodData}"></paper-input>
                <paper-toggle-button checked="${this._isStandardReference}" @checked-changed="${e => this._standardReferenceModified(e)}">
                    (Only Search Generic Food List)
                </paper-toggle-button>
                <paper-dropdown-menu @iron-select="_foodSelectionMenuIronSelectHandler" required="" style="width:100%;" label="2. Pick a specific food" id="foodSelectionMenu" vertical-align="bottom" horizontal-align="left">
                    <div id="foodSelectionDropdownContentId" class="dropdown-content" slot="dropdown-content" style="width: 75vw; height: 72vh; ">
                        <iron-list id="foodFluidIronList" items="[[_foodsChanged(foods.*)]]" @selected-item-changed="modifySelectedFood()" selection-enabled="">
                            <template>
                                <div @click="_foodFluidItemToggled" tabindex="[[tabIndex]]" class="[[_computedClass(selected)]]">[[item.name]]</div>
                            </template>
                        </iron-list>
                    </div>
                </paper-dropdown-menu>
                <div class="horizontal">
                    <paper-input name="measure" label="(Serving size)" readonly="true" value="[[_getMeasure(foodNutrients.*)]]"></paper-input>
                    <paper-input class="gram-weight-field" name="weight" label="(Weight (g))" readonly="true" value="[[_getWeight(foodNutrients.*)]]"></paper-input>
                </div>
                <div class="horizontal">
                    <paper-input id="multiplierFieldId" name="multiplier" @click="_onMultiplierTap" type="number" step="any" label="3. How many servings?" value="{{multiplier}}" required=""></paper-input>
                    <paper-input class="gram-weight-field" name="consumedGrams" label="(Total (g))" value="{{consumedGrams}}" readonly="true"></paper-input>
                </div>
                <button @click="_submit" title="Consume" class="blue">${localDining}</button>
                <button @click="_reset" title="Reset" class="blue">${clearIcon}</button>
            </form>
        </iron-form>
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

    static get properties() {
        return {
            _foodFluidSearchString: { type: String },
            _isStandardReference: { type: Boolean, value: true }
        }
    }

    _modifyFoodFluidSearchString(e) {
        //console.info("made it to modifyFoodFluidSearchString", e);

    }

    _onSearchStringTap(e) {
        console.info("_onSearchStringTap reached", e);
        // this references search string input
        this.inputElement.inputElement.select();
    }

    _getFoodData(e) {
        console.info("_getFoodData reached", e);
        if (this._foodFluidSearchString && this._foodFluidSearchString !== '') {
            // TODO dispatch action to get food data
            store.dispatch(searchForFoodsByString(this._foodFluidSearchString, this._isStandardReference));
        }
    }

    _standardReferenceModified(e) {
        this._isStandardReference = e.detail.value;
        // TODO re-dispatch action to search for foods with 
        // this string since a request parameter has changed.
    }
}

window.customElements.define('bc-eat', BcEat);
