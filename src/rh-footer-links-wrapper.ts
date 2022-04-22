import { css, html, LitElement } from 'lit';
import { state, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { mobileBreakpoint } from './lib/tokens.js';

interface LinkSet {
  header: HTMLElement | null;
  panel: Element[];
}

export class RhFooterLinkWrapper extends LitElement {
  static get tag() {
    return `rh-footer-links-wrapper`;
  }

  @property({ type: Boolean, attribute: 'is-mobile' })
  public isMobile: boolean = false;

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
        --pfe-accordion--accent--expanded: var(--_accent-color);
        --pfe-accordion--accent--active: var(--_accent-color);
      }

      :host([is-mobile]) {
        --link-font-size: 16px;
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

      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      @media screen and (min-width: ${mobileBreakpoint}) {
        .link {
          width: calc(50%);
        }
      }
    `;
  }

  firstUpdated() {
    this.build();
  }

  async build(): Promise<void> {
    // get a list of rh-footer-links items
    if (this.shadowRoot) {
      const children = this.shadowRoot
        .querySelector('slot')
        ?.assignedElements({ flatten: true });
      if (children && children.length > 0) {
        const linkSets: LinkSet[] | undefined = this.shadowRoot
          .querySelector('slot')
          ?.assignedElements({ flatten: true })
          .map(item => ({
            // for each header we need to create an array of panel items that it's associated with.
            header: item.querySelector('[slot="header"]'),
            // collect all of the rh-footer-link items and add attributes
            panel: [...item.querySelectorAll('rh-footer-link')].map(child => {
              // ensure it has a class of .link
              child.classList.add('link');
              // ensure it has a part name of link
              child.setAttribute('part', 'link');
              return child;
            }),
          }));

        if (linkSets) {
          this.linkSets = linkSets;
        }
      }
    }
  }

  render() {
    return html`
      ${this.isMobile
        ? html`
            <div id="dynamic-links" class="base" part="base">
              ${this.linkSets
                ? html`
                    <pfe-accordion part="accordion">
                      ${this.linkSets?.map(
                        item => html`
                          <pfe-accordion-header part="accordion-header"
                            >${unsafeHTML(
                              item.header?.outerHTML
                            )}</pfe-accordion-header
                          >
                          <pfe-accordion-panel part="accordion-panel"
                            >${item.panel.map(
                              _item => html`${unsafeHTML(_item.outerHTML)}`
                            )}
                          </pfe-accordion-panel>
                        `
                      )}
                    </pfe-accordion>
                  `
                : ''}
            </div>
            <slot id="default-slot" hidden> </slot>
          `
        : html` <slot></slot> `}
    `;
  }
}

customElements.define(RhFooterLinkWrapper.tag, RhFooterLinkWrapper);