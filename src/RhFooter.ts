import { css, LitElement } from 'lit';
import { html } from 'lit/static-html.js';
import { pfelement } from '@patternfly/pfe-core/decorators';
import {
  desktopLargeBreakpoint,
  mobileBreakpoint,
  mobileXlBreakpoint,
  tabletLandscapeBreakpoint,
} from './lib/tokens.js';
import './rh-footer-social-link.js';
import './rh-footer-links.js';
import './rh-footer-link.js';
import './rh-footer-links-wrapper.js';
import './rh-footer-block.js';
import './rh-footer-copyright.js';

@pfelement()
export class RhFooter extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          --_icon-color: var(--rh-footer-icon-color, #8a8d90);
          --_icon-color-hover: var(--rh-footer-icon-color-hover, #b8bbbe);
          --_border-color: var(--rh-footer-border-color, #6a6e73);
          --_accent-color: var(--rh-footer-accent-color, #ee0000);
          --_section-side-gap: var(
            --rh-footer-section-side-gap,
            var(--pf-global--spacer--xl, 32px)
          );
          /* PFE 2.0 ContextControllerAPI: set context for child components */
          --context: dark;
          /* apply sensible defaults based on redhat standards. */
          color: #fff;
          font-family: 'Red Hat Text', 'RedHatText', 'Overpass', Overpass, Arial,
            sans-serif;
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
          padding: 0.3em;
          top: 0;
          right: 0;
          font-size: 0.7rem;
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
          content: '';
          background-color: var(--_border-color);
          height: 1px;
          position: absolute;
          bottom: 0px;
          width: calc(100% - var(--_section-side-gap) * 2);
          left: var(--_section-side-gap);
        }

        .header-primary {
          flex: 1 1 auto;
        }

        .header-secondary {
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
            'logo'
            'primary'
            'spacer'
            'secondary'
            'tertiary';
          gap: 32px 24px;
        }

        @media screen and (min-width: ${mobileBreakpoint}) {
          .footer {
            grid-template-columns: 4fr 4fr 4fr;
            grid-template-areas:
              'logo logo logo'
              'primary primary primary'
              'spacer spacer spacer'
              'secondary secondary tertiary';
          }
        }

        @media screen and (min-width: ${mobileXlBreakpoint}) {
          .footer {
            grid-template-columns: auto 10fr 2fr;
            grid-template-areas:
              'logo primary tertiary'
              'logo secondary tertiary';
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

        .footer-logo {
          grid-area: logo;
          width: 42px;
        }

        .footer-logo-image {
          fill: var(--_icon-color);
        }

        .footer-logo-image:is(:hover, :focus-within) {
          fill: var(--_icon-color-hover);
        }

        .footer-primary {
          grid-area: primary;
        }

        .footer-secondary {
          grid-area: secondary;
          color: #d2d2d2;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-tertiary {
          grid-area: tertiary;
          display: grid;
          justify-content: flex-start;
          align-items: center;
        }

        @media screen and (min-width: ${mobileXlBreakpoint}) {
          .footer-tertiary {
            display: grid;
            justify-content: flex-end;
            align-items: center;
          }
        }

        .footer-primary rh-footer-links,
        .footer-primary slot::slotted(rh-footer-links) {
          display: grid;
          justify-content: left;
          grid-template-columns: 1fr 1fr;
          gap: 8px 24px;
        }

        @media screen and (min-width: ${mobileBreakpoint}) {
          .footer-primary rh-footer-links,
          .footer-primary slot::slotted(rh-footer-links) {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }

        @media screen and (min-width: ${mobileXlBreakpoint}) {
          .footer-primary rh-footer-links,
          .footer-primary slot::slotted(rh-footer-links) {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          }
        }

        .footer-secondary rh-footer-links,
        .footer-secondary slot::slotted(rh-footer-links) {
          display: flex;
          gap: 8px 24px;
        }

        @media screen and (min-width: 500px) {
          .footer-secondary rh-footer-links,
          .footer-secondary slot::slotted(rh-footer-links) {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
        }
        @media screen and (min-width: ${mobileXlBreakpoint}) {
          .footer-secondary rh-footer-links,
          .footer-secondary slot::slotted(rh-footer-links) {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 8px 24px;
          }
        }

        @media screen and (max-width: ${tabletLandscapeBreakpoint}) {
          /* Add a bit more margin to the primary content on mobile */
          .main-primary {
            margin: calc(
                var(--pf-global--spacer--2xl, 48px) -
                  var(--pf-global--spacer--xl, 32px)
              )
              0;
          }

          .footer-logo {
            grid-area: logo;
          }

          .footer-primary {
            grid-area: primary;
          }
        }

        @media screen and (max-width: ${tabletLandscapeBreakpoint}) {
          /* Equalize padding on mobile */
          .section {
            --_section-side-gap: var(
              --rh-footer-section-side-gap,
              var(--pf-global--spacer--3xl, 24px)
            );
          }
        }

        @media screen and (min-width: ${tabletLandscapeBreakpoint}) and (max-width: ${desktopLargeBreakpoint}) {
          /* Equalize padding on mobile */
          .section {
            --_section-side-gap: var(
              --rh-footer-section-side-gap,
              var(--pf-global--spacer--3xl, 32px)
            );
          }

          .header,
          .main {
            /* switch header to use grid instead */
            display: grid;
            grid-template-columns: 8fr 4fr;
          }
        }

        @media screen and (min-width: ${desktopLargeBreakpoint}) {
          .section {
            --_section-side-gap: var(
              --rh-footer-section-side-gap,
              var(--pf-global--spacer--3xl, 64px)
            );
          }

          .header,
          .main {
            /* switch header to use grid instead */
            display: grid;
            grid-template-columns: 8fr 4fr;
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

        .social-links rh-footer-links,
        .social-links slot::slotted(rh-footer-links) {
          display: flex;
          flex-direction: row;
          gap: 16px;
        }

        .links {
          display: flex;
          gap: var(--pf-global--spacer--xl, 32px);
          flex-wrap: wrap;
        }

        #footer-logo {
          width: 42px;
        }
      `,
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    // load these lazily, outside of the constructor. Must do this for SSR to work
    import('@patternfly/pfe-icon/dist/pfe-icon.js');
    import('@patternfly/pfe-accordion/dist/pfe-accordion.js');
  }

  render() {
    return html`
      <footer class="base" part="base">
        <slot name="base">
          <div class="section header" part="section header">
            <slot name="header">
              <div class="header-primary" part="header-primary">
                <slot name="header-primary">
                  <div class="logo" part="logo">
                    <slot name="logo">
                      <a href="/en">
                        <img
                          alt="Red Hat"
                          src="https://static.redhat.com/libs/redhat/brand-assets/2/corp/logo--on-dark.svg"
                        />
                      </a>
                    </slot>
                  </div>
                </slot>
              </div>
              <div class="header-secondary" part="header-secondary">
                <slot name="header-secondary">
                  <div class="social-links">
                    <slot name="social-links">
                      <rh-footer-links
                        class="social-links-item"
                        part="social-links-item"
                        aria-label="Red Hat social media links"
                      >
                        <slot name="social-links-start"></slot>
                        <rh-footer-social-link
                          class="social-link"
                          part="social-link"
                          icon="web-icon-linkedin"
                          ><a href="#LinkedIn"
                            >LinkedIn</a
                          ></rh-footer-social-link
                        >
                        <rh-footer-social-link
                          class="social-link"
                          part="social-link"
                          icon="web-icon-youtube"
                          ><a href="#Youtube">Youtube</a></rh-footer-social-link
                        >
                        <rh-footer-social-link
                          class="social-link"
                          part="social-link"
                          icon="web-icon-facebook"
                          ><a href="#Facebook"
                            >Facebook</a
                          ></rh-footer-social-link
                        >
                        <rh-footer-social-link
                          class="social-link"
                          part="social-link"
                          icon="web-icon-twitter"
                          ><a href="#Twitter">Twitter</a></rh-footer-social-link
                        >
                        <slot name="social-links-end"></slot>
                      </rh-footer-links>
                    </slot>
                  </div>
                </slot>
              </div>
            </slot>
          </div>
          <div class="section main" part="section main">
            <slot name="main">
              <div class="main-primary" part="main-primary">
                <slot name="main-primary">
                  <div class="links" part="links">
                    <slot name="links"></slot>
                  </div>
                </slot>
              </div>
              <div class="main-secondary" part="main-secondary">
                <slot name="main-secondary">
                  <rh-footer-block>
                    <h3 slot="header">About Red Hat</h3>
                    <p>
                      We’re the world’s leading provider of enterprise open
                      source solutions―including Linux, cloud, container, and
                      Kubernetes. We deliver hardened solutions that make it
                      easier for enterprises to work across platforms and
                      environments, from the core datacenter to the network
                      edge.
                    </p>
                  </rh-footer-block>
                </slot>
              </div>
            </slot>
          </div>
          <div class="section footer" part="section footer">
            <slot name="footer">
              <div class="footer-logo" part="footer-logo">
                <slot name="footer-logo">
                  <a
                    class="footer-logo-anchor"
                    part="footer-logo-anchor"
                    href="/en"
                    alt="Visit Red Hat"
                  >
                    <svg
                      title="Red Hat logo"
                      class="footer-logo-image"
                      part="footer-logo-image"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 192 145"
                    >
                      <defs>
                        <style>
                          .band {
                            fill: transparent;
                          }
                        </style>
                      </defs>
                      <path
                        class="band"
                        d="M157.77,62.61a14,14,0,0,1,.31,3.42c0,14.88-18.1,17.46-30.61,17.46C78.83,83.49,42.53,53.26,42.53,44a6.43,6.43,0,0,1,.22-1.94l-3.66,9.06a18.45,18.45,0,0,0-1.51,7.33c0,18.11,41,45.48,87.74,45.48,20.69,0,36.43-7.76,36.43-21.77,0-1.08,0-1.94-1.73-10.13Z"
                      />
                      <path
                        class="cls-1"
                        d="M127.47,83.49c12.51,0,30.61-2.58,30.61-17.46a14,14,0,0,0-.31-3.42l-7.45-32.36c-1.72-7.12-3.23-10.35-15.73-16.6C124.89,8.69,103.76.5,97.51.5,91.69.5,90,8,83.06,8c-6.68,0-11.64-5.6-17.89-5.6-6,0-9.91,4.09-12.93,12.5,0,0-8.41,23.72-9.49,27.16A6.43,6.43,0,0,0,42.53,44c0,9.22,36.3,39.45,84.94,39.45M160,72.07c1.73,8.19,1.73,9.05,1.73,10.13,0,14-15.74,21.77-36.43,21.77C78.54,104,37.58,76.6,37.58,58.49a18.45,18.45,0,0,1,1.51-7.33C22.27,52,.5,55,.5,74.22c0,31.48,74.59,70.28,133.65,70.28,45.28,0,56.7-20.48,56.7-36.65,0-12.72-11-27.16-30.83-35.78"
                      />
                    </svg>
                  </a>
                </slot>
              </div>
              <div class="footer-primary" part="footer-primary">
                <slot name="footer-primary">
                  <rh-footer-links
                    class="traditional-links"
                    part="traditional-links"
                    aria-label="Red Hat corporate links"
                  >
                    <rh-footer-link
                      class="traditional-link"
                      part="traditional-link"
                      ><a href="#">About Red Hat</a></rh-footer-link
                    >
                    <rh-footer-link
                      class="traditional-link"
                      part="traditional-link"
                      ><a href="#">Jobs</a></rh-footer-link
                    >
                    <rh-footer-link
                      class="traditional-link"
                      part="traditional-link"
                      ><a href="#">Events</a></rh-footer-link
                    >
                    <rh-footer-link
                      class="traditional-link"
                      part="traditional-link"
                      ><a href="#">Locations</a></rh-footer-link
                    >
                    <rh-footer-link
                      class="traditional-link"
                      part="traditional-link"
                      ><a href="#">Contact Red Hat</a></rh-footer-link
                    >
                    <rh-footer-link
                      class="traditional-link"
                      part="traditional-link"
                      ><a href="#">Red Hat Blog</a></rh-footer-link
                    >
                    <rh-footer-link
                      class="traditional-link"
                      part="traditional-link"
                      ><a href="#"
                        >Diversity, equity, and inclusion</a
                      ></rh-footer-link
                    >
                    <rh-footer-link
                      class="traditional-link"
                      part="traditional-link"
                      ><a href="#">Cool Stuff Store</a></rh-footer-link
                    >
                  </rh-footer-links>
                </slot>
              </div>
              <div class="spacer" part="spacer"></div>
              <div class="footer-secondary" part="footer-secondary">
                <slot name="footer-secondary">
                  <rh-footer-links
                    class="traditional-item"
                    part="traditional-item-tertiary"
                    aria-label="Red Hat compliance links"
                  >
                    <rh-footer-copyright></rh-footer-copyright>
                    <rh-footer-link
                      class="traditional-link"
                      part="traditional-link"
                      ><a href="#">Privacy statement</a>
                    </rh-footer-link>
                    <rh-footer-link
                      class="traditional-link"
                      part="traditional-link"
                      ><a href="#">Terms of use</a>
                    </rh-footer-link>
                    <rh-footer-link
                      class="traditional-link"
                      part="traditional-link"
                      ><a href="#">All policies and guidelines</a>
                    </rh-footer-link>
                    <rh-footer-link
                      class="traditional-link"
                      part="traditional-link"
                      ><a href="#">Digital accessibility</a>
                    </rh-footer-link>
                    <rh-footer-link
                      class="traditional-link"
                      part="traditional-link"
                      ><a href="#">Cookie preferences</a>
                    </rh-footer-link>
                  </rh-footer-links>
                </slot>
              </div>
              <div class="footer-tertiary" part="footer-tertiary">
                <slot name="footer-tertiary"></slot>
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
  static getImportURL(relativeLocation: string | URL): string | URL {
    const url = new URL(relativeLocation, import.meta.url);
    if (url.protocol === 'file:') {
      return new URL(relativeLocation, window.location.href);
    }
    return url;
  }
}
