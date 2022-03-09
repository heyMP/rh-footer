import {html, css, LitElement} from 'lit';

export class RhFooterBlock extends LitElement {
	static get tag() {
		return 'rh-footer-block';
	}

	static get styles() {
		return css`
			:host {
				display: block;
				position: relative;
			}

      /** Add margin to blocks that aren't first in the sidebar. */
      :host(:not(:first-of-type)) {
        margin-top: 1.5em;
      }
      /** Add the separator to blocks in the middle */
      :host(:not(:last-of-type, :first-of-type)){
				border-bottom: 1px solid var(--_border-color);
				padding-bottom: 1.5em;
      }

			::slotted(*) {
				color: #fff;
				font-size: 14px;
				text-decoration: none;
			}

			::slotted(:is(h1,h2,h3,h4,h5)) {
				font-weight: 500;
				font-size: 14px;
				margin-top: 0px;
			}

		  .content ::slotted(*) {
				color: #D2D2D2;
				font-size: 0.875rem;
				font-family: "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif;
				font-weight: 400;
			}
		`;
	}

	constructor() {
		super();
	}

	render() {
		return html`
			<div class="base" part="base">
				<div class="header" part="header"><slot name="header"></slot></div>
				<div class="content" part="content"><slot></slot></div>
			</div>
		`;
	}
}

customElements.define(RhFooterBlock.tag, RhFooterBlock);