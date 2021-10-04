import { html, css, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import '@patternfly/pfe-icon/dist/pfe-icon.js';

export class RhFooterSocialIcon extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        --pfe-icon--color: var(--rh-footer-social-icon--color, #8A8D90);
      }

      #icon {
        width: 32px;
        height: 32px;
        object-fit: cover;
      }
    `;
  }

  static get properties() {
    return {
      icon: {
        type: String
      },
      href: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.icon = '';
    this.href = '';
  }

  render() {
    return html`
      <a href=${this.href}>
        <pfe-icon size="2x" icon="web-icon-${this.icon}"></pfe-icon>
      </a>
    `;
  }
}