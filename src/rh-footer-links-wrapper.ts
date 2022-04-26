import { css, html, LitElement } from 'lit';
import { state, property } from 'lit/decorators.js';
import { tabletLandscapeBreakpoint, mobileBreakpoint } from './lib/tokens.js';
import { MatchMediaController } from './lib/MatchMediaController.js';

interface LinkSet {
  header: HTMLElement | null;
  panel: HTMLElement | null;
}

export class RhFooterLinkWrapper extends LitElement {
  static get tag() {
    return `rh-footer-links-wrapper`;
  }

  @state() private linkSets?: LinkSet[];

  static get styles() {
    return css`
      :host {
        display: contents;
        width: 100%;
        --pfe-accordion--Color: #fff;
        --pfe-accordion--Color--expanded: #fff;
        --pfe-accordion--Color--active: #fff;
        --pfe-accordion--BackgroundColor: transparent;
        --pfe-accordion--BackgroundColor--expanded: #151515;
        --pfe-accordion--BorderColor: var(--_border-color);
        --pfe-accordion--FontWeight--header: 300;
        --pfe-accordion--accent--expanded: var(--_accent-color);
        --pfe-accordion--accent--active: var(--_accent-color);
      }

      :host([is-mobile]) {
        --link-font-size: 16px;
      }

      .base {
        width: 100%;
      }

      ::slotted(rh-footer-links) {
        --rh-footer-links-gap: var(--pf-global--spacer--lg, 24px);
        display: inline-flex;
        width: 100%;
        margin-bottom: var(--pf-global--spacer--md, 16px);
      }

      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      @media screen and (min-width: ${mobileBreakpoint}) {
        :host {
          --links-width: 50%;
        }
      }
    `;
  }

  private isMobile;

  constructor() {
    super();
    this.isMobile = new MatchMediaController(
      this,
      `(max-width: ${tabletLandscapeBreakpoint})`
    );
  }

  firstUpdated() {
    this.build();
  }

  async build(): Promise<void> {
    // get a list of rh-footer-links items
    if (this.shadowRoot) {
      const linkSets: LinkSet[] | undefined = [...this.querySelectorAll('rh-footer-links')]
        .map(item => ({
          // for each header we need to create an array of panel items that it's associated with.
          header: item.querySelector('[slot="header"]'),
          panel: item as HTMLElement,
        }));

      this.linkSets = linkSets;

      // update the lightdom
      if (this.isMobile.value) {
        for (let index in linkSets) {
          const set = linkSets[index];
          if (set.header) {
            set.header.setAttribute('slot', `header-${index}`)
            this.appendChild(set.header);
          }
          if (set.panel) {
            set.panel.setAttribute('slot', `panel-${index}`)
            this.appendChild(set.panel);
          }
        }
      }
    }
  }

  render() {
    this.build();
    return html`
      ${this.isMobile.value && this.linkSets ? html`
        <pfe-accordion>
          ${this.linkSets.map((_, index) => html`
            <pfe-accordion-header><slot name="header-${index}"></slot></pfe-accordion-header>
            <pfe-accordion-panel><slot name="panel-${index}"></slot></pfe-accordion-panel>
          `)}
        </pfe-accordion>
      ` : html`
        <slot></slot>
      `}
    `;
  }
}

customElements.define(RhFooterLinkWrapper.tag, RhFooterLinkWrapper);
