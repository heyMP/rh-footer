import { css, html, LitElement, render } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

interface LinkSet {
	header: HTMLElement | null,
	panel: Element[]
}

export class RhFooterLinksMobile extends LitElement {
  static get tag() {
    return `rh-footer-links-mobile`;
  }

  static get styles() {
    return css`
      :host {
        display: block;
				width: 100%;
				--pfe-accordion--Color: #fff;
				--pfe-accordion--Color--expanded: #fff;
				--pfe-accordion--Color--active: #fff;
				--pfe-accordion--BackgroundColor: rgba(247, 247, 249, 0.1);
				--pfe-accordion--BackgroundColor--expanded: rgba(247, 247, 249, 0.1);
      }
    `;
  }

  constructor() {
    super();
  }

	firstUpdated() {
		this.build();
	}

	build(): void {
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

				// Render the mobile links template using lit-html
				const outlet = this.shadowRoot.querySelector('#dynamic-links');
				if (outlet && linkSets) render(this.renderMobileLinks(linkSets), <HTMLElement>outlet);
			};
		}
	}

	renderMobileLinks(data: LinkSet[]): any {
		return html`
			<pfe-accordion>
				${data.map(item => html`
					<pfe-accordion-header>${unsafeHTML(item.header?.outerHTML)}</pfe-accordion-header>
					<pfe-accordion-panel>${item.panel.map(_item => html`${unsafeHTML(_item.outerHTML)}`)}</pfe-accordion-panel>
				`)}
			</pfe-accordion>
		`
	}

  render() {
    return html`
			<div id="dynamic-links"></div>
			<slot id="default-slot" hidden></slot>
		`;
  }
}

customElements.define(RhFooterLinksMobile.tag, RhFooterLinksMobile);
