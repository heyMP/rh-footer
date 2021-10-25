import { html, css, LitElement } from 'lit';

export class RhFooterLinksPanel extends LitElement {
  static get tag() {
    return `rh-footer-links-panel`;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
			slot[name="header"]::slotted(*) {
				font-weight: 500;
				font-size: 14px;
				color: #fff;
			}
			.footer--list ul,
			slot:not([name="header"])::slotted(ul) {
				list-style: none;
				margin: 0;
				padding: 0;
			}
			.footer--list ul li {
				margin-bottom: 16px;
			}
			.footer--list ul li a {
				color: #fff;
				font-size: 14px;
				text-decoration: none;
			}
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <slot name="header"></slot>
      <slot></slot>
    `;
  }
}

customElements.define(RhFooterLinksPanel.tag, RhFooterLinksPanel);
