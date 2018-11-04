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
// The following does not work (see https://stackoverflow.com/questions/52193786/polymer-3-0-uncaught-reference-error-on-paper-drop-down-click):  
//import 'web-animations-js/web-animations-next-lite.min.js'; // must be done in index.html with polymer.json and package.json entries.
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
//import '@polymer/iron-input/iron-input.js';
// Elements needed by this element
//import {Formfield} from "@material/mwc-formfield"

//import {MDCTextField} from '@material/textfield';

// We are lazy loading its reducer.
import nutrientsOfInterest from '../reducers/nutrientsofinterest.js';
import food from '../reducers/food.js';
store.addReducers({
  nutrientsOfInterest, food
});


class BcEat extends connect(store)(PageViewElement) {
    render() {
        //const textField = new MDCTextField(document.querySelector('.mdc-text-field'));
        return html`
      ${SharedStyles}
      <style >
                .item.true {
                    background: black;
                    color: white;
                }

                .item, .item.false {
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
                <paper-input id="foodFluidSearchStringId" 
                @tap="${this._onSearchStringTap}" name="foodFluidSearch" label="1. Search for a Food" 
                @value-changed="${e => {this._foodFluidSearchString = e.detail.value; console.info("debug",this)}}" required="" autocapitalize="off" 
                spellcheck="true" @blur="${e => this._getFoodData(e)}"></paper-input>
                <paper-toggle-button checked="${this._isStandardReference}" 
                @checked-changed="${e => this._standardReferenceModified(e)}">
                    (Only Search Generic Food List)
                </paper-toggle-button>
                <paper-dropdown-menu @iron-select="${this._foodSelectionMenuIronSelectHandler}" required="" 
                style="width:100%;" label="2. Pick a specific food" id="foodSelectionMenu" 
                vertical-align="bottom" horizontal-align="left">
                    <div id="foodSelectionDropdownContentId" class="dropdown-content" slot="dropdown-content" style="width: 75vw; height: 72vh; ">
                        <iron-list id="foodFluidIronList" .items="${this._latestFoodList}" 
                        @selected-item-changed="${e => this._foodSelectionModified(e)}" 
                        @click="${e => this._foodFluidItemToggled(e)}" selection-enabled=""
                        multi-selection="false">
                            <template>
                                <div id="foodlistitem[[index]]" tabindex="[[tabindex]]" class$="item [[selected]]">[[item.name]]</div>
                            </template>
                        </iron-list>
                    </div>
                </paper-dropdown-menu>
                <div class="horizontal">
                    <paper-input name="measure" label="(Serving size)" readonly="true" value="[[_getMeasure(foodNutrients.*)]]"></paper-input>
                    <paper-input class="gram-weight-field" name="weight" label="(Weight (g))" readonly="true" value="[[_getWeight(foodNutrients.*)]]"></paper-input>
                </div>
                <div class="horizontal">
                    <paper-input id="multiplierFieldId" name="multiplier" @click="_onMultiplierTap" 
                    type="number" step="any" label="3. How many servings?" value="{{multiplier}}" required=""></paper-input>
                    <paper-input class="gram-weight-field" name="consumedGrams" label="(Total (g))" 
                    value="{{consumedGrams}}" readonly="true"></paper-input>
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
            _isStandardReference: { type: Boolean, value: true },
            _latestFoodList: { type: Array }
        }
    }

    // This is called every time something is updated in the store.
    _stateChanged(state) {
        this._latestFoodList = state.food.latestFoodList;
    }

    firstUpdated() {
        this._foodList = this.shadowRoot.querySelector('#foodFluidIronList');
    }

    _foodListItemClickHandler(e) {
        console.info("food list item click handler has this event", this._foodList.modelForElement(e.target).item);
    }

    _foodSelectionModified(e) {
        console.info("food selection modified event", e);
        //this.selectedFood = e.???;
    }

    _computedClass(isSelected) {
        var classes = 'item';
        if (isSelected) {
            classes += ' selected';
        }
        return classes;
    }

    _foodFluidItemToggled(e) {
        const theModel = this._foodList.modelForElement(e.target);
        const theItemElement = this.shadowRoot.querySelector("#foodlistitem" + theModel.index);
        console.info("food fluid item toggled event", e);
        if (theModel.selected) {
            this.shadowRoot.querySelector('#foodSelectionDropdownContentId')
            .dispatchEvent(new CustomEvent('iron-select', 
            { bubbles: true, composed: true, detail: { item: {...theModel.item, label: theModel.item.name } } }));
            // TODO this does not work
            //theItemElement.classList.add('selected');
        }
        else {
            //theItemElement.classList.remove('selected');
        }
      }

    _modifyFoodFluidSearchString(e) {
        console.info("made it to modifyFoodFluidSearchString", e);
        this._foodFluidSearchString = e.detail.value;
    }

    _onSearchStringTap(e) {
        console.info("_onSearchStringTap reached", e);
        // this references search string input
        this.inputElement.inputElement.select();
    }

    _foodSelectionMenuIronSelectHandler(e) {
        console.debug("in _foodSelectionMenuIronSelectHandler: ", e);
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
