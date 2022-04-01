import { css, LitElement, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { html, literal } from 'lit/static-html.js';
import { pfelement } from "@patternfly/pfe-core/decorators";
import { MatchMediaController } from './lib/MatchMediaController.js';
import { desktopSmallBreakpoint, desktopLargeBreakpoint, mobileLandscapeBreakpoint, mobileBreakpoint, mobileXlBreakpoint, tabletLandscapeBreakpoint } from './lib/tokens.js';
import './rh-footer-social-links.js';
import './rh-footer-social-link.js';
import './rh-footer-links.js';
import './rh-footer-link.js';
import './rh-footer-links-mobile.js';
import './rh-footer-block.js';
import './rh-footer-copyright.js';

@pfelement()
export class RhFooter extends LitElement {

  static get styles() {
    return [
      css`
        :host {
          --_border-color: var(--rh-footer-border-color, #6A6E73);
          --_accent-color: var(--rh-footer-accent-color,  #ee0000);
          --_section-side-gap: var(--rh-footer-section-side-gap,  var(--pf-global--spacer--xl, 32px));
          /* PFE 2.0 ContextControllerAPI: set context for child components */
          --context: dark;
          /* apply sensible defaults based on redhat standards. */
          color: #fff;
          font-family: "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif;
          line-height: 125%;
          font-weight: 300;
          /* set at 18px for margin and padding standardization */
          font-size: 18px;
          display: flex;
          flex-direction: column;
        }

        * {
          box-sizing: border-box;
        }

        /**
         * Debugging
         */
        :host([debug]) *:not(.spacer, .base, a, svg) {
          position: relative;
          outline: 2px dotted red;
          /* make sure we have some */
          min-height: 25px;
        }

        :host([debug]) *:not(.spacer, .base, a, svg)::after {
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

        /**
         * Regions
         */
        .section {
          padding: var(--pf-global--spacer--xl, 32px) var(--_section-side-gap);
        }

        .header {
          background-color: #212427;
          /* children should flex wrap on mobile */
          display: flex;
          flex-wrap: wrap;
          gap: var(--pf-global--spacer--xl, 32px);
          align-items: center;
          position: relative;
        }

        .header::after {
          display: block;
          content: "";
          background-color: var(--_border-color);
          height: 1px;
          position: absolute;
          bottom: 0px;
          width: calc(100% - var(--_section-side-gap) * 2);
          left: var(--_section-side-gap);
        }

        .header__primary {
          flex: 1 1 auto;
        }

        .header__secondary {
          /* secondary should be push to the end */
          /* of the line on mobile */
          flex: 0 1 auto;
        }

        .main {
          background-color: #212427;
          display: grid;
          gap: var(--pf-global--spacer--xl, 32px);
        }

        .footer {
          --link-font-size: 12px;
          /* reduce the line-height for footer links */
          line-height: 100%;
          background-color: #151515;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-areas:
            "logo"
            "primary"
            "spacer"
            "secondary"
            "tertiary";
          gap: 32px 24px;
        }

        @media screen and (min-width: ${mobileBreakpoint}) {
          .footer {
            grid-template-columns: 4fr 4fr 4fr;
            grid-template-areas:
              "logo logo logo"
              "primary primary primary"
              "spacer spacer spacer"
              "secondary secondary tertiary";
          }
        }

        @media screen and (min-width: ${mobileXlBreakpoint}) {
          .footer {
            grid-template-columns: auto 10fr 2fr;
            grid-template-areas:
              "logo primary tertiary"
              "logo secondary tertiary";
            gap: 24px 32px;
          }
        }

        .spacer {
          grid-area: spacer;
          border-bottom: 1px solid var(--_border-color);
        }

        @media screen and (min-width: ${mobileXlBreakpoint}) {
          .spacer {
            display: none;
          }
        }

        .footer__logo {
          grid-area: logo;
        }

        .footer__primary {
          grid-area: primary;
        }

        .footer__secondary {
          grid-area: secondary;
          color: #D2D2D2;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer__tertiary {
          grid-area: tertiary;
          display: grid;
          justify-content: flex-start;
          align-items: center;
        }

        @media screen and (min-width: ${mobileXlBreakpoint}) {
          .footer__tertiary {
            display: grid;
            justify-content: flex-end;
            align-items: center;
          }
        }

        .secondary__main {
          min-height: 150px;
        }

        .footer__primary rh-footer-links,
        .footer__primary slot::slotted(rh-footer-links) {
          display: grid;
          justify-content: left;
          grid-template-columns: 1fr 1fr;
          gap: 8px 24px;
        }

        @media screen and (min-width: ${mobileBreakpoint}) {
          .footer__primary rh-footer-links,
          .footer__primary slot::slotted(rh-footer-links) {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }

        @media screen and (min-width: ${mobileXlBreakpoint}) {
          .footer__primary rh-footer-links,
          .footer__primary slot::slotted(rh-footer-links) {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          }
        }

        .footer__secondary rh-footer-links,
        .footer__secondary slot::slotted(rh-footer-links) {
          display: flex;
          gap: 8px 24px;
        }

        @media screen and (min-width: 500px) {
          .footer__secondary rh-footer-links,
          .footer__secondary slot::slotted(rh-footer-links) {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
        }
        @media screen and (min-width: ${mobileXlBreakpoint}) {
          .footer__secondary rh-footer-links,
          .footer__secondary slot::slotted(rh-footer-links) {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 8px 24px;
          }
        }

        @media screen and (max-width: ${tabletLandscapeBreakpoint}) {
          /* Add a bit more margin to the primary content on mobile */
          .main__primary {
            margin: calc(var(--pf-global--spacer--2xl, 48px) - var(--pf-global--spacer--xl, 32px)) 0;
          }

          .traditional-item,
          ::slotted(rh-traditional-links[slot="footer__secondary"]){
            grid-template-columns: 1fr 1fr;
          }

          .footer__logo {
            grid-area: logo;
          }

          .footer__primary {
            grid-area: primary;
          }

          .footer__copyright__desktop{
            display: none;
          }

          .footer__copyright__mobile{
            display: initial;
          }
        }

        @media screen and (max-width: ${tabletLandscapeBreakpoint}) {
          /* Equalize padding on mobile */
          .section {
            --_section-side-gap: var(--rh-footer-section-side-gap,  var(--pf-global--spacer--3xl, 24px));
          }
        }

        @media screen and (min-width: ${tabletLandscapeBreakpoint}) and (max-width: ${desktopLargeBreakpoint}) {
          /* Equalize padding on mobile */
          .section {
            --_section-side-gap: var(--rh-footer-section-side-gap,  var(--pf-global--spacer--3xl, 32px));
          }

          .header, .main {
            /* switch header to use grid instead */
            display: grid;
            grid-template-columns: 8fr 4fr;
          }
        }

        @media screen and (min-width: ${desktopLargeBreakpoint}){
          .section {
            --_section-side-gap: var(--rh-footer-section-side-gap,  var(--pf-global--spacer--3xl, 64px));
          }

          .header, .main {
            /* switch header to use grid instead */
            display: grid;
            grid-template-columns: 8fr 4fr;
          }
        }

        @media screen and (max-width: ${mobileLandscapeBreakpoint}){
          .traditional-item,
          ::slotted(rh-traditional-links[slot="footer__secondary"]){
            grid-template-columns: 1fr;
          }
        }

        @media screen and (min-width: ${mobileLandscapeBreakpoint} and (max-width: ${tabletLandscapeBreakpoint})){
          .traditional-item,
          ::slotted(rh-traditional-links[slot="footer__secondary"]){
            grid-template-columns: 1fr 1fr;
          }
        }

        /**
         * Content
         */
        .logo {
          /* fix wierd problem where there is extra space below logo */
          line-height: 0px;
        }

        .logo slot::slotted(a),
        .logo a {
          display: inline-flex;
          width: 156px;
        }

        .social-links {
          display: flex;
          margin-left: 0;
          padding-left: 0;
        }

        .links {
          display: flex;
          gap: var(--pf-global--spacer--xl, 32px);
          flex-wrap: wrap;
        }

        .links rh-footer-links,
        .links slot::slotted(rh-footer-links) {
          width: calc((100% / var(--rh-footer--links-columns, 4)) - var(--pf-global--spacer--xl, 32px));
        }

        #footer-logo {
          width: 42px;
        }
      `,
    ];
  }

  @property({ attribute: 'disable-language-switcher', reflect: true }) disableLanguageSwitcher = false;

  @state() private _lang = 'en';

  private isMobile;

  constructor() {
    super();
    this.isMobile = new MatchMediaController(this, `(max-width: ${tabletLandscapeBreakpoint})`);
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
              <div class="header__primary" part="header__primary">
                <slot name="header__primary">
                  <div class="logo" part="logo">
                    <slot name="logo">
                      <a href="/en" title="Red Hat">
                        <img
                          id="logo__image"
                          class="redhat-logo"
                          src="https://static.redhat.com/libs/redhat/brand-assets/2/corp/logo--on-dark.svg"
                          aria-hidden="true"
                        />
                      </a>
                    </slot>
                  </div>
                </slot>
              </div>
              <div class="header__secondary" part="header__secondary">
                <slot name="header__secondary">
                  <div class="social-links">
                    <slot name="social-links">
                      <rh-footer-social-links class="social-links-item" part="social-links-item">
                        <h3>Social Media Links</h3>
                        <slot name="social-links--start"></slot>
                        <rh-footer-social-link class="social-link" part="social-link" icon="web-icon-linkedin"><a href="#LinkedIn">LinkedIn</a></rh-footer-social-link>
                        <rh-footer-social-link class="social-link" part="social-link" icon="web-icon-youtube"><a href="#Youtube">Youtube</a></rh-footer-social-link>
                        <rh-footer-social-link class="social-link" part="social-link" icon="web-icon-facebook"><a href="#Facebook">Facebook</a></rh-footer-social-link>
                        <rh-footer-social-link class="social-link" part="social-link" icon="web-icon-twitter"><a href="#Twitter">Twitter</a></rh-footer-social-link>
                        <slot name="social-links--end"></slot>
                      </rh-footer-social-links>
                    </slot>
                  </div>
                </slot>
              </div>
            </slot>
          </div>
          <div class="section main" part="section main">
            <slot name="main">
              <div class="main__primary" part="main__primary">
                <slot name="main__primary">
                  <!-- This breaks Lit SSR -->
                  <${this.linksWrapperTag()} class="links" part="links" exportparts="link">
                    <slot name="links">
                      <slot name="links--start"></slot>
                      <slot name="links--column1">
                        <rh-footer-links class="links-item" part="links-item">
                          <h3 slot="header">Products</h3>
                          <rh-footer-link class="link" part="link"><a href="#">Red Hat Ansible Automation Platform</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">Red Hat Enterprise Linux</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">Red Hat OpenShift</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">Red Hat OpenShift Container Storage</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">Red Hat OpenStack Platform</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">See all products</a></rh-footer-link>
                        </rh-footer-links>
                      </slot>
                      <slot name="links--column2">
                        <rh-footer-links class="links-item" part="links-item">
                          <h3 slot="header">Tools</h3>
                          <rh-footer-link class="link" part="link"><a href="#">My account</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">Customer support</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">Red Hat OpenShift</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">Contact training</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">Red Hat OpenStack Platform</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">See all products</a></rh-footer-link>
                        </rh-footer-links>
                      </slot>
                      <slot name="links--column3">
                        <rh-footer-links class="links-item" part="links-item">
                          <h3 slot="header">Try, buy, sell</h3>
                          <rh-footer-link class="link" part="link"><a href="#">Red Hat Store</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">Red Hat Enterprise Linux</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">Red Hat OpenShift</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">Contact training</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">Red Hat OpenStack Platform</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">See all products</a></rh-footer-link>
                        </rh-footer-links>
                      </slot>
                      <slot name="links--column4">
                        <rh-footer-links class="links-item" part="links-item">
                          <h3 slot="header">Communicate</h3>
                          <rh-footer-link class="link" part="link"><a href="#">Contact us</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">Feedback</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">Social</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">Red Hat newsletter</a></rh-footer-link>
                          <rh-footer-link class="link" part="link"><a href="#">Email preferences</a></rh-footer-link>
                        </rh-footer-links>
                      </slot>
                      <slot name="links--end"></slot>
                    </slot>
                  </${this.linksWrapperTag()}>
                </slot>
              </div>
              <div class="main__secondary" part="main__secondary">
                <slot name="main__secondary">
                  <rh-footer-block>
                    <h3 slot="header">About Red Hat</h3>
                    <p>We’re the world’s leading provider of enterprise open source solutions―including Linux, cloud, container, and Kubernetes. We deliver hardened solutions that make it easier for enterprises to work across platforms and environments, from the core datacenter to the network edge.</p>
                  </rh-footer-block>
                </slot>
              </div>
            </slot>
          </div>
          <div class="section footer" part="section footer">
            <slot name="footer">
              <div class="footer__logo" part="footer__logo">
                <slot name="footer__logo">
                  <a href="/en" title="Red Hat">
                    <svg id="footer-logo" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 145"><defs><style>.cls-1{fill:#6A6E73;} .band{fill:transparent;}</style></defs><title>RedHat-Logo-Hat-Color</title><path class="band" d="M157.77,62.61a14,14,0,0,1,.31,3.42c0,14.88-18.1,17.46-30.61,17.46C78.83,83.49,42.53,53.26,42.53,44a6.43,6.43,0,0,1,.22-1.94l-3.66,9.06a18.45,18.45,0,0,0-1.51,7.33c0,18.11,41,45.48,87.74,45.48,20.69,0,36.43-7.76,36.43-21.77,0-1.08,0-1.94-1.73-10.13Z"/><path class="cls-1" d="M127.47,83.49c12.51,0,30.61-2.58,30.61-17.46a14,14,0,0,0-.31-3.42l-7.45-32.36c-1.72-7.12-3.23-10.35-15.73-16.6C124.89,8.69,103.76.5,97.51.5,91.69.5,90,8,83.06,8c-6.68,0-11.64-5.6-17.89-5.6-6,0-9.91,4.09-12.93,12.5,0,0-8.41,23.72-9.49,27.16A6.43,6.43,0,0,0,42.53,44c0,9.22,36.3,39.45,84.94,39.45M160,72.07c1.73,8.19,1.73,9.05,1.73,10.13,0,14-15.74,21.77-36.43,21.77C78.54,104,37.58,76.6,37.58,58.49a18.45,18.45,0,0,1,1.51-7.33C22.27,52,.5,55,.5,74.22c0,31.48,74.59,70.28,133.65,70.28,45.28,0,56.7-20.48,56.7-36.65,0-12.72-11-27.16-30.83-35.78"/></svg>
                  </a>
                </slot>
              </div>
              <div class="footer__primary" part="footer__primary">
                <slot name="footer__primary">
                  <rh-footer-links class="traditional-links" part="traditional-links">
                    <rh-footer-link class="traditional-link" part="traditional-link"><a href="#">About Red Hat</a></rh-footer-link>
                    <rh-footer-link class="traditional-link" part="traditional-link"><a href="#">Jobs</a></rh-footer-link>
                    <rh-footer-link class="traditional-link" part="traditional-link"><a href="#">Events</a></rh-footer-link>
                    <rh-footer-link class="traditional-link" part="traditional-link"><a href="#">Locations</a></rh-footer-link>
                    <rh-footer-link class="traditional-link" part="traditional-link"><a href="#">Contact Red Hat</a></rh-footer-link>
                    <rh-footer-link class="traditional-link" part="traditional-link"><a href="#">Red Hat Blog</a></rh-footer-link>
                    <rh-footer-link class="traditional-link" part="traditional-link"><a href="#">Cool Stuff Store</a></rh-footer-link>
                    <rh-footer-link class="traditional-link" part="traditional-link"><a href="#">Diversity, equity, and inclusion</a></rh-footer-link>
                  </rh-footer-links>
                </slot>
              </div>
              <div class="spacer" part="spacer"></div>
              <div class="footer__secondary" part="footer__secondary">
                <slot name="footer__secondary">
                  <rh-footer-links class="traditional-item" part="traditional-item-tertiary">
                    <rh-footer-copyright></rh-footer-copyright>
                    <rh-footer-link class="traditional-link" part="traditional-link"><a href="#">Privacy statement</a>             </rh-footer-link>
                    <rh-footer-link class="traditional-link" part="traditional-link"><a href="#">Terms of use</a>                  </rh-footer-link>
                    <rh-footer-link class="traditional-link" part="traditional-link"><a href="#">All policies and guidelines</a>   </rh-footer-link>
                    <rh-footer-link class="traditional-link" part="traditional-link"><a href="#">Digital accessibility</a>         </rh-footer-link>
                    <rh-footer-link class="traditional-link" part="traditional-link"><a href="#">Cookie preferences</a>            </rh-footer-link>
                  </rh-footer-links>
                </slot>
              </div>
              <div class="footer__tertiary" part="footer__tertiary">
                <slot name="footer__tertiary">
                  <a href="https://www.redhat.com/en/summit" alt="Visit Red Hat Summit" slot="footer__tertiary"><img src="${new URL('../assets/summit-logo.png', import.meta.url)}" alt="Red Hat Summit" /></a>
                </slot>
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