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

        :host([debug]) * {
          position: relative;
          outline: 2px dotted red;
        }

        :host([debug]) :after {
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

        .section--primary {
          background-color: #212427;
          min-height: 300px;
          /* Padding bottom on the primary section is smaller than usual */
          padding-bottom: var(--pf-global--spacer--lg, 24px);
          display: grid;
          gap: var(--pf-global--spacer--xl, 32px);
        }

        .primary__header {
          min-height: 80px;
        }

        .primary__header-aside {
          min-height: 80px;
        }

        .primary__main {
          min-height: 280px;
          /* Increase the gap for this item on mobile */
          margin: calc(var(--pf-global--spacer--2xl, 48px) - var(--pf-global--spacer--xl, 32px)) 0;
        }

        .primary__aside {
          min-height: 200px;
        }

        .section--secondary {
          background-color: #151515;
          min-height: 100px;
          display: grid;
          gap: var(--pf-global--spacer--xl, 32px);
        }

        .secondary__main {
          min-height: 150px;
        }

        .secondary__aside {
          min-height: 100px;
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
        <section class="section section--primary" part="section section--primary">
          <div class="primary__header" part="primary__header"></div>
          <div class="primary__header-aside" part="primary__header-aside"></div>
          <div class="primary__main" part="primary__main"></div>
          <div class="primary__aside" part="primary__aside"></div>
        </section>
        <section class="section section--secondary" part="section section--secondary">
          <div class="secondary__main" part="secondary__main"></div>
          <div class="secondary__aside" part="secondary__aside"></div>
        </section>
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