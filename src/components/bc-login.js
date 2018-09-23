import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class BcLogin extends PageViewElement {

  static get properties() {
    return {
      user: { type: Object, value: { displayName : 'A. Yancovich'} }
    };
  }

  render() {
    // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // ...
    //   });
      
    return html`
       ${SharedStyles}
      <section>
        <h2>Let's login folks!!</h2>
        <p>We can get our avitar and a uid to use in firestore and lots of fun stuff.</p>
        <p>Logged in as:  ${this.user ? this.user.displayName : '...not logged in'}</p>
        <p>So we need a button or two...</p>
        <button on-click="${(e) => this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}">Login</button>
      </section>
     `;
  }

  connectedCallback() {
      super.connectedCallback();
      this.auth = firebase.auth();
      this.auth.onAuthStateChanged(user => {
        const event = new CustomEvent('auth', { detail: user, bubbles: true, composed: true});
        this.user = user; // TODO declare user as a property...
        this.dispatchEvent(event);
      });
      this.user = {displayName: "...not logged in"};
  }

  handleLoginClick(e) {
      const google = new firebase.auth.GoogleAuthProvider();
      this.auth.signInWithRedirect(google);
  }

  
}

window.customElements.define('bc-login', BcLogin);
