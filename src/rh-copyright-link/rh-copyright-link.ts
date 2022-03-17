import {html, css, LitElement} from 'lit';

export class RhCopyrightLink extends LitElement {
	static get tag() {
		return 'rh-copyright-link';
	}

	static get styles() {
		return css`
			:host {
				color: #D2D2D2;
				font-size: 14px;
				margin-top: 0;
				margin-bottom: 0;
			}
			::slotted(*) {
				color: #fff !important;
				white-space: nowrap;
				font-size: 14px;
				padding-top: 16px;
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

customElements.define(RhCopyrightLink.tag, RhCopyrightLink);