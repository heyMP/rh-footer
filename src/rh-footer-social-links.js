import { html, css, LitElement } from 'lit';

export class RhFooterSocialLinks extends LitElement {
  static get tag() {
    return `rh-footer-social-links`;
  }

  static get styles() {
    return css`
      :host {
        display: flex;
				width: 100%;
				gap: 16px;
      }
    `;
  }

  constructor() {
    super();
    this.setAttribute('role', 'list');
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define(RhFooterSocialLinks.tag, RhFooterSocialLinks);
