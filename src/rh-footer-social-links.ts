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
      /* Hide title */
      slot::slotted(:is(h1,h2,h3,h4,h5,h6)) {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap; /* added line */
        border: 0;
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
