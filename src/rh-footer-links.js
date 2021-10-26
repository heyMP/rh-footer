import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

export class RhFooterLinks extends LitElement {
	static get styles() {
		return css`
			:host {
				display: flex;
				flex-direction: column;
				gap: 10px;
			}
			::slotted(:is(h1,h2,h3,h4,h5)) {
				font-weight: 500;
				font-size: 14px;
				margin-top: 0;
				margin-bottom: 0;
			}
		`;
	}

	constructor() {
		super();
		this.setAttribute('role', 'list');
	}

	render() {
		return html`
			<slot></slot>
		`;
	}
}

customElements.define('rh-footer-links', RhFooterLinks);