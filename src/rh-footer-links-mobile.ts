import { css, html, LitElement, render } from 'lit';
import { state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { mobileBreakpoint } from './lib/tokens.js';

interface LinkSet {
	header: HTMLElement | null,
	panel: Element[]
}

export class RhFooterLinksMobile extends LitElement {
  static get tag() {
    return `rh-footer-links-mobile`;
  }

	@state() private linkSets?: LinkSet[];

  static get styles() {
    return css`
      :host {
        display: block;
				width: 100%;
				--pfe-accordion--Color: #fff;
				--pfe-accordion--Color--expanded: #fff;
				--pfe-accordion--Color--active: #fff;
				--pfe-accordion--BackgroundColor: transparent;
				--pfe-accordion--BackgroundColor--expanded: #151515;
				--pfe-accordion--BorderColor: var(--_border-color);
				--pfe-accordion--FontWeight--header: 300;
      }

			.base {
				width: 100%;
			}

			.link {
				display: inline-flex;
				width: 100%;
				gap: var(--pf-global--spacer--lg, 24px);
				margin-bottom: var(--pf-global--spacer--md, 16px);
			}

			@media screen and (min-width: ${mobileBreakpoint}) {
				.link {
					width: calc(50%);
				}
			}

			.link a {
				font-size: var(--rh-footer-mobile-link--FontSize, 16px);
			}
    `;
  }

	firstUpdated() {
		this.build();
	}

	async build(): Promise<void> {
		// get a list of rh-footer-links items
		if (this.shadowRoot) {
			const children = this.shadowRoot.querySelector('slot')?.assignedElements({ flatten: true });
			if (children && children.length > 0) {
				const linkSets: LinkSet[] | undefined = this.shadowRoot.querySelector('slot')?.assignedElements({ flatten: true })
					.map(item => ({
						// for each header we need to create an array of panel items that it's associated with.
						header: item.querySelector('[slot="header"]'),
						// collect all of the headers siblings
						panel: [...item.children].filter(child => child.getAttribute('slot') !== 'header'),
					}));

				if (linkSets) {
					this.linkSets = linkSets;
				}
			};
		}
	}

  render() {
    return html`
			<div id="dynamic-links" class="base" part="base">
				${this.linkSets ? html`
					<pfe-accordion part="accordion">
						${this.linkSets?.map(item => html`
							<pfe-accordion-header part="accordion-header">${unsafeHTML(item.header?.outerHTML)}</pfe-accordion-header>
							<pfe-accordion-panel part="accordion-panel">${item.panel.map(_item => html`${unsafeHTML(_item.outerHTML)}`)}</pfe-accordion-panel>
						`)}
					</pfe-accordion>
				` : ''}
			</div>
			<slot id="default-slot" hidden></slot>
		`;
  }
}

customElements.define(RhFooterLinksMobile.tag, RhFooterLinksMobile);
