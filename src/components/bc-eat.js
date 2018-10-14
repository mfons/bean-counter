import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class BcEat extends PageViewElement {
  render() {
    return html`
      ${SharedStyles}
      <section>
        <h2>2. Eat!</h2>
        <p>After you specify your nutrients of interest, here is where you can record what you have eaten or see what
            nutritional impact a certain kind of food would have on your food intake...
        </p>
      </section>
    `
  }
}

window.customElements.define('bc-eat', BcEat);
