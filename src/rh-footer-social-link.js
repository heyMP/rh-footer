import { html, css, LitElement } from 'lit';

export class RhFooterSocialLink extends LitElement {
	static get styles() {
		return css`
			:host {
				--pfe-icon--size: var(--rh-footer--social-icon--size, 32px);
			}
		`;
	}
	static get properties() {
		return {
			'icon': { type: String }
		}
	}
	constructor() {
		super();
		this.icon = null;
	}
	render() {
		return html`
			<pfe-icon icon=${this.icon}><slot></slot></pfe-icon>
		`;
	}
}

window.customElements.define('rh-footer-social-link', RhFooterSocialLink);