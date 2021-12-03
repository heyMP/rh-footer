import { css, LitElement, unsafeCSS } from 'lit';
import { property, state  } from 'lit/decorators.js';
import { html, literal } from 'lit/static-html.js';
import { MatchMediaController } from './lib/MatchMediaController.js';
import './rh-footer-social-links.js';
import './rh-footer-social-link.js';
import './rh-footer-links.js';
import './rh-footer-link.js';
import './rh-footer-links-mobile.js';

const mobileBreakpoint = unsafeCSS`700px`;

export class RhFooter extends LitElement {

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          /* remove */
          width: 100%;
          background-color: #151515;
          /* /remove */
        }

        :host([debug]) *:not(.spacer) {
          position: relative;
          outline: 2px dotted red;
          /* make sure we have some */
          min-height: 25px;
        }

        :host([debug]) *:not(.spacer)::after {
          content: attr(part);
          display: block;
          position: absolute;
          color: white;
          background-color: darkslategray;
          padding: .3em;
          top: 0;
          right: 0;
          font-size: .7rem;
        }

        .section {
          padding: var(--pf-global--spacer--xl, 32px) var(--pf-global--spacer--lg, 24px);
        }

        .header {
          background-color: #212427;
          display: grid;
          gap: var(--pf-global--spacer--xl, 32px);
          border-bottom: 1px solid #6A6E73;
        }

        .main {
          background-color: #212427;
          display: grid;
          gap: var(--pf-global--spacer--xl, 32px);
        }

        .footer {
          background-color: #151515;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-areas:
            "primary"
            "secondary"
            "tertiary";
          gap: var(--pf-global--spacer--xl, 32px);
        }

        .footer__primary {
          grid-area: primary;
        }

        .footer__secondary {
          grid-area: secondary;
        }

        .footer__tertiary {
          grid-area: tertiary;
        }

        .secondary__main {
          min-height: 150px;
        }

        @media screen and (min-width: 550px) {
          .footer {
            grid-template-columns: 4fr 4fr 4fr;
            grid-template-areas:
              "primary primary primary"
              "secondary secondary tertiary";
          }
        }

        @media screen and (max-width: ${mobileBreakpoint}) {
          /* Add a bit more margin to the primary content on mobile */
          .main__primary {
            margin: calc(var(--pf-global--spacer--2xl, 48px) - var(--pf-global--spacer--xl, 32px)) 0;
          }
        }

        @media screen and (min-width: ${mobileBreakpoint}) {
          /* Equalize padding on mobile */
          .section {
            padding: var(--pf-global--spacer--xl, 32px);
          }

          .header, .main {
            grid-template-columns: 8fr 4fr;
          }

          .footer {
            grid-template-columns: 10fr 2fr;
            grid-template-areas:
              "primary tertiary"
              "secondary tertiary";
          }
        }
      `,
    ];
  }

  @property({ attribute: 'disable-language-switcher', reflect: true }) disableLanguageSwitcher = false;

  @state() private _lang = 'en';

  private isMobile;

  constructor() {
    super();
    this.isMobile = new MatchMediaController(this, `(max-width: ${mobileBreakpoint})`);
  }

  connectedCallback() {
    super.connectedCallback();
    // load these lazily, outside of the constructor. Must do this for SSR to work
    import("@patternfly/pfe-icon/dist/pfe-icon.js");
    import("@patternfly/pfe-accordion/dist/pfe-accordion.js");
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  linksWrapperTag(): unknown {
    return this.isMobile.value ? literal`rh-footer-links-mobile` : literal`div`;
  }

  render() {
    return html`
      <footer class="base" part="base">
        <slot name="base">
          <div class="section header" part="section header">
            <slot name="header">
              <div class="header__primary" part="header__primary"></div>
              <div class="header__secondary" part="header__secondary"></div>
            </slot>
          </div>
          <div class="section main" part="section main">
            <slot name="main">
              <div class="main__primary" part="main__primary"></div>
              <div class="main__secondary" part="main__secondary"></div>
            </slot>
          </div>
          <div class="section footer" part="section footer">
            <slot name="footer">
              <div class="footer__primary" part="footer__primary">
                <slot name="footer__primary"> </slot>
              </div>
              <div class="footer__secondary" part="footer__secondary">
                <slot name="footer__secondary"></slot>
              </div>
              <div class="footer__tertiary" part="footer__tertiary">
                <slot name="footer__tertiary"></slot>
              </div>
            </slot>
          </div>
        </slot>
      </footer>
    `;
  }

  /**
   * Isomorphic import.meta.url function
   * Requires a node.js dom shim that sets window.location
   */
  getImportURL(relativeLocation: string | URL): string | URL {
    const url = new URL(relativeLocation, import.meta.url);
    if (url.protocol === 'file:') {
      return new URL(relativeLocation, window.location.href);
    }
      return url;
  }

  _langChangeHandler(): void {
    if (document.querySelector) {
      const lang = document?.querySelector('[lang]')?.getAttribute('lang');
      if (lang) {
        this._lang = lang;
      }
    }
  }
}