import {html, css, LitElement} from 'lit';
import { mobileXlBreakpoint } from '../lib/tokens';

export class RhTraditionalLink extends LitElement {
	static get tag() {
		return 'rh-traditional-link';
	}

	static get styles() {
		return css`
			:host {
				display: flex;
				/* flex: 0 1 28%; */
			}
			::slotted(*) {
				color: #fff !important;
				white-space: nowrap;
				font-size: 14px;
				text-decoration: none;
			}
			@media screen and (max-width: ${mobileXlBreakpoint}) {
				::slotted(*){
					white-space: unset;
				}
				
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

customElements.define(RhTraditionalLink.tag, RhTraditionalLink);