import { css, html, LitElement, render } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

export class RhFooterSocialLink extends LitElement {
	static get tag() {
		return 'rh-footer-social-link';
	}
  static get styles() {
    return css`
      :host {
        display: inline-block;
        --pfe-icon--size: var(--rh-footer--social-icon--size, 32px);
      }
    `;
  }
  static get properties() {
    return {
      icon: { type: String },
    };
  }

  constructor() {
    super();
    this.icon = null;
  }

  updated() {
    this.updateLightdom();
  }

  updateLightdom() {
    const oldDiv = this.querySelector('a');
    if (oldDiv) {
      const newDiv = oldDiv.cloneNode(true);
      // remove the _rendered content
      newDiv.querySelectorAll('[_rendered]').forEach(i => {
        i.remove();
      });
      newDiv.innerHTML = `<pfe-icon icon="${this.icon}">${newDiv.innerHTML}</pfe-icon>`;
      oldDiv.parentNode.replaceChild(newDiv, oldDiv);
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

window.customElements.define(RhFooterSocialLink.tag, RhFooterSocialLink);
