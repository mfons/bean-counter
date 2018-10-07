import { LitElement, html } from '@polymer/lit-element';

class NutrientsOfInterestItem extends LitElement {
  render() {
    return html`
      ${this.name}:
      </span>
    `;
  }

  static get properties() {
    return {
      name: { type: String}
    }
  }
}

window.customElements.define('nutrientsofinterest-item', NutrientsOfInterestItem);
