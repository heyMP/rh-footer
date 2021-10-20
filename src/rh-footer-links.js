import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import './rh-footer-link.js';

export class RhFooterLinks extends LitElement {
	static get styles() {
		return css`
			:host {
			}
			::slotted(:is(h1,h2,h3,h4,h5)) {
				font-weight: 500;
				font-size: 14px;
			}
			::slotted(ul) {
				list-style: none;
				margin: 0;
				padding: 0;
				font-size: 14px;
			}
		`;
	}

	static get properties() {
		return {
			content: { type: String }
		};
	}

	constructor() {
		super();
		this.content = this;
	}

	render() {
		return html`
			<slot></slot>
		`;
	}
}

customElements.define('rh-footer-links', RhFooterLinks);