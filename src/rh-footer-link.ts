import { html, css, LitElement } from 'lit';

export class RhFooterLink extends LitElement {
  static get tag() {
    return 'rh-footer-link';
  }

  static get styles() {
    return css`
      :host {
        --_color: var(--link-color, #fff);
        --_font-size: var(--link-font-size, 14px);
        display: block;
      }
      ::slotted(*) {
        color: var(--_color) !important;
        font-size: var(--_font-size);
        text-decoration: none;
      }
      ::slotted(a:is(:hover, :focus)) {
        text-decoration: underline;
      }
    `;
  }

  render() {
    return html` <slot></slot> `;
  }
}

customElements.define(RhFooterLink.tag, RhFooterLink);
