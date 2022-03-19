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
				--_text-decoration: var(--link-text-decoration, none);
				--_text-decoration-active: var(--link-text-decoration-active, underline);
				--_text-line-height: var(--link-line-height, 1);
				display: block;
				line-height: var(--_text-line-height);
			}
			::slotted(*) {
				color: var(--_color) !important;
				font-size: var(--_font-size);
				text-decoration: var(--_text-decoration);
			}
			::slotted(a:hover),
			::slotted(a:focus-visible) {
				text-decoration: var(--_text-decoration-active);
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