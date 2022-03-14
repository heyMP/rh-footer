import {html, css, LitElement} from 'lit';

export class RhFooterTertiaryLink extends LitElement {
	static get tag() {
		return 'rh-footer-tertiary-link';
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			::slotted(*) {
				color: #d2d2d2 !important;
				text-decoration: underline;
				white-space: nowrap;
				font-size: 14px;
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

customElements.define(RhFooterTertiaryLink.tag, RhFooterTertiaryLink);