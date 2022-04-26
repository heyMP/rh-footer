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
        /* display: inline-flex; */
        /* width: 100%; */
        /* gap: var(--pf-global--spacer--lg,24px); */
        /* margin-bottom: var(--pf-global--spacer--md,16px); */
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

  constructor() {
    super();
    this.setAttribute('role', 'listitem');
  }

  render() {
    return html` <slot></slot> `;
  }
}

customElements.define(RhFooterLink.tag, RhFooterLink);
