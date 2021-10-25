import {html, css, LitElement} from 'lit';

export class RhFooterLink extends LitElement {
	static get tag() {
		return 'rh-footer-link';
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			::slotted(*) {
				color: #fff !important;
				font-size: 14px;
				text-decoration: none;
			}
		`;
	}

	constructor() {
		super();
		this.setAttribute('role', 'listitem');
	}

	render() {
		return html`
			<slot></slot>
		`;
	}
}

customElements.define(RhFooterLink.tag, RhFooterLink);