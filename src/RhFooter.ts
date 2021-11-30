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
        }

        /* Dan stuff  */
        footer {
          background-color: #212427;
          color: #fff;
          font-family: 'Red Hat Text';
        }

        .footer--body-container {
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-gap: 64px;
          margin: 32px 0;
        }

        .footer--container {
          max-width: 1320px;
          margin: 0 auto;
        }

        .footer--header {
          --pfe-icon--color: #8a8d90;
          display: grid;
          grid-template-columns: 2fr 1fr;
          padding: 32px 0;
          grid-gap: 64px;
          border-bottom: 1px solid #6a6e73;
          align-items: center;
        }

        .footer--header-section img {
          display: block;
          max-width: 160px;
        }

        .footer--social-links {
          display: flex;
          margin-left: 0;
          padding-left: 0;
        }
        .footer--social-link {
          display: inline-block;
          margin-right: 18px;
          --pfe-icon--size: var(--rh-social-icon--size, 32px);
        }
        .footer--social-link:last-child {
          margin-right: 0;
        }
        .footer--list-header {
          font-weight: 500;
          font-size: 14px;
        }
        .footer--list ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .footer--list ul li {
          margin-bottom: 16px;
        }
        .footer--list ul li a {
          color: #fff;
          font-size: 14px;
          text-decoration: none;
        }
        .footer--list-container {
          display: grid;
          grid-gap: 32px;
        }
        @media screen and (min-width: ${mobileBreakpoint}) {
          .footer--list-container {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        slot[name="header--logo"]::slotted(*),
        slot[name="header--logo"] > * {
          display: inline-flex;
        }

        .footer--description *:is(h1,h2,h3,h4,h5,h6),
        .footer--description slot::slotted(*:is(h1,h2,h3,h4,h5,h6)) {
          font-weight: 500;
          font-size: 14px;
          color: #fff;
          margin-top: 0;
        }
        .footer--description *:not(h1,h2,h3,h4,h5,h6),
        .footer--description slot::slotted(*:not(h1,h2,h3,h4,h5,h6)) {
          color: #d2d2d2;
          font-size: 14px;
          line-height: 21px;
        }

        .footer--splitter {
          margin: 32px 0;
          background-color: #6a6e73;
          height: 1px;
          width: auto;
        }

        .footer--global {
          background-color: #151515;
          padding: 32px 0;
        }
        .footer--global-list {
          align-items: center;
        }
        .footer--global-list ul {
          padding-left: 0;
          margin-top: 8px;
          margin-bottom: 24px;
        }
        .footer--global-list ul li {
          display: inline-block;
          padding-right: 32px;
        }
        .footer--global-list ul li a {
          color: #fff;
          font-size: 14px;
        }
        .footer--legal p {
          font-size: 12px;
          color: #d2d2d2;
          margin-bottom: 5px;
        }
        .footer--legal ul {
          padding-left: 0;
          margin-top: 0;
        }
        .footer--legal ul li {
          display: inline-block;
          text-decoration: underline;
          margin-right: 24px;
        }
        .footer--legal ul li a {
          color: #d2d2d2;
          font-size: 12px;
        }
        .footer--promo {
          text-align: right;
        }

        .footer--layout-special {
          display: grid;
          grid-template-columns: 42px 4fr 1fr;
          gap: 32px;
          align-items: top;
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
      <slot name="styles" hidden></slot>
      <footer>
        <div class="footer--container">
          <section class="footer--header">
            <div class="footer--header-section">
              <slot name="header--logo">
                <a href="/en" title="Red Hat">
                  <img
                    id="logo__image"
                    class="redhat-logo"
                    src="https://static.redhat.com/libs/redhat/brand-assets/2/corp/logo--on-dark.svg"
                    aria-hidden="true"
                    style="width:156px;"
                  />
                </a>
              </slot>
            </div>
            <div class="footer--header-section">
              <div class="footer--social-links">
                <slot name="social-links">
                  <rh-footer-social-links slot="social-links">
                    <h3>Social Media Links</h3>
                    <slot name="social-links--start"></slot>
                    <rh-footer-social-link icon="web-icon-linkedin"><a href="#LinkedIn">LinkedIn</a></rh-footer-social-link>
                    <rh-footer-social-link icon="web-icon-youtube"><a href="#Youtube">Youtube</a></rh-footer-social-link>
                    <rh-footer-social-link icon="web-icon-facebook"><a href="#Facebook">Facebook</a></rh-footer-social-link>
                    <rh-footer-social-link icon="web-icon-twitter"><a href="#Twitter">Twitter</a></rh-footer-social-link>
                    <slot name="social-links--end"></slot>
                  </rh-footer-social-links>
                </slot>
              </div>
            </div>
          </section>
          <section class="footer--body">
            <div class="footer--body-container">
              <${this.linksWrapperTag()} class="footer--list-container">
                  <slot name="links">
                    <slot name="links--start"></slot>
                    <slot name="links--column1">
                      <rh-footer-links>
                        <h3 slot="header">Products</h3>
                        <rh-footer-link><a href="#">Red Hat Ansible Automation Platform</a></rh-footer-link>
                        <rh-footer-link><a href="#">Red Hat Enterprise Linux</a></rh-footer-link>
                        <rh-footer-link><a href="#">Red Hat OpenShift</a></rh-footer-link>
                        <rh-footer-link><a href="#">Red Hat OpenShift Container Storage</a></rh-footer-link>
                        <rh-footer-link><a href="#">Red Hat OpenStack Platform</a></rh-footer-link>
                        <rh-footer-link><a href="#">See all products</a></rh-footer-link>
                      </rh-footer-links>
                    </slot>
                    <slot name="links--column2">
                      <rh-footer-links>
                        <h3 slot="header">Tools</h3>
                        <rh-footer-link><a href="#">My account</a></rh-footer-link>
                        <rh-footer-link><a href="#">Customer support</a></rh-footer-link>
                        <rh-footer-link><a href="#">Red Hat OpenShift</a></rh-footer-link>
                        <rh-footer-link><a href="#">Contact training</a></rh-footer-link>
                        <rh-footer-link><a href="#">Red Hat OpenStack Platform</a></rh-footer-link>
                        <rh-footer-link><a href="#">See all products</a></rh-footer-link>
                      </rh-footer-links>
                      <rh-footer-links>
                        <h3 slot="header">Try, buy, sell</h3>
                        <rh-footer-link><a href="#">Red Hat Store</a></rh-footer-link>
                        <rh-footer-link><a href="#">Red Hat Enterprise Linux</a></rh-footer-link>
                        <rh-footer-link><a href="#">Red Hat OpenShift</a></rh-footer-link>
                        <rh-footer-link><a href="#">Contact training</a></rh-footer-link>
                        <rh-footer-link><a href="#">Red Hat OpenStack Platform</a></rh-footer-link>
                        <rh-footer-link><a href="#">See all products</a></rh-footer-link>
                      </rh-footer-links>
                    </slot>
                    <slot name="links--column4">
                      <rh-footer-links>
                        <h3 slot="header">Communicate</h3>
                        <rh-footer-link><a href="#">Contact us</a></rh-footer-link>
                        <rh-footer-link><a href="#">Feedback</a></rh-footer-link>
                        <rh-footer-link><a href="#">Social</a></rh-footer-link>
                        <rh-footer-link><a href="#">Red Hat newsletter</a></rh-footer-link>
                        <rh-footer-link><a href="#">Email preferences</a></rh-footer-link>
                      </rh-footer-links>
                    </slot>
                    <slot name="links--end"></slot>
                  </slot>
              </${this.linksWrapperTag()}>
              <div class="footer--container-item">
                <div class="footer--description">
                  <slot name="description">
                    <slot name="description--title">
                      <h3>About Red Hat</h3>
                    </slot>
                    <slot name="description--header"></slot>
                    <slot name="description--about-redhat">
                      <p>
                        We’re the world’s leading provider of enterprise open source solutions―including Linux, cloud, container, and Kubernetes. We deliver hardened solutions that make it easier for enterprises to work across platforms and environments, from the core datacenter to the network edge.
                      </p>
                    </slot>
                    <slot name="description--main"></slot>
                    <div class="footer--splitter"></div>
                    <slot name="description--footer"></slot>
                    ${
                      !this.disableLanguageSwitcher
                        ? html`
                            <h3>
                              Select a language
                            </h3>
                            <img src=${this.getImportURL('../assets/language-switcher.png')}>
                          `
                        : ''
                    }
                  </slot>
                </div>
              </div>
            </div>
        </div>
        <section class="footer--global">
          <div class="footer--container">
            <div class="footer--layout-special">
              <div class="footer--logo">
                <img src=${this.getImportURL('../assets/small-logo-on-dark.png')} />
              </div>
              <div class="group">
                <div class="footer--global-list">
                  <ul>
                    <li><a href="#">About Red Hat</a></li>
                    <li><a href="#">Jobs</a></li>
                    <li><a href="#">Events</a></li>
                    <li><a href="#">Locations</a></li>
                    <li><a href="#">Contact Red Hat</a></li>
                    <li><a href="#">Red Hat Blog</a></li>
                    <li><a href="#">Cool Stuff Store</a></li>
                  </ul>
                </div>
                <div class="footer--legal">
                  <p>Copyright ®2021 Red Hat, Inc.</p>
                  <ul>
                    <li><a href="#">Privacy statement</a></li>
                    <li><a href="#">Terms of use</a></li>
                    <li><a href="#">All policies and guidelines</a></li>
                    <li><a href="#">Cookie preferences and Do not sell my info</a></li>
                  </ul>
                </div>
              </div>
              <div class="footer--promo">
                <slot name="footer--promo"></slot>
              </div>
            </div>
          </div>
        </section>
      </div>
      <slot hidden></slot>
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