import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller';
import { initializer } from '@patternfly/pfe-core/decorators';
import { Logger } from '@patternfly/pfe-core/controllers/logger';
import { getRandomId } from '@patternfly/pfe-core/functions/random';
import { tabletLandscapeBreakpoint } from './lib/tokens.js';
import { MatchMediaController } from './lib/MatchMediaController.js';

interface LinkSet {
  header: HTMLElement | null;
  panel: Element[];
}

export class RhFooterLinks extends LitElement {
  /**
   * Visibily hide the header slot. Setting this to true will not affect
   * aria-labelledby.
   */
  @property({ type: Boolean, attribute: 'header-hidden', reflect: true })
  public headerHidden: boolean = false;

  /**
   * Opt. into mobile version of the links menu
   */
  @property({ type: Boolean, reflect: true })
  public mobile: boolean = false;

  /** 
   * Readonly state of whether the mobile view is active
   */
  @property({ type: Boolean, attribute: 'is-mobile' })
  public isMobile: boolean = new MatchMediaController(
      this,
      `(max-width: ${tabletLandscapeBreakpoint})`
    ).value;

  @state() private linkSets?: LinkSet[];

  private logger = new Logger(this);

  // private slots = new SlotController(this, {
  //   slots: ['header'],
  // });

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    [part] {
      display: contents;
    }
    ::slotted(:is(h1, h2, h3, h4, h5)) {
      font-weight: 500;
      font-size: 14px;
      margin-top: 0;
      margin-bottom: 0;
    }
    :host([header-hidden]) .header ::slotted(*) {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;

  @initializer()
  protected _init() {
    this.updateAccessibility();
  }

  public updateAccessibility() {
    // ensure we've rendered to our shadowroot
    const header: HTMLElement | null = this.querySelector('[slot="header"]');
    const ul: HTMLElement | null = this.querySelector('ul');
    if (header && ul) {
      // ensure there is an id on the header slot
      const headerId = header.id || getRandomId('rh-footer-links');
      if (headerId !== header.id) header.id = headerId;
      header.id = headerId;
      ul.setAttribute('aria-labelledby', headerId);
    } else {
      // this.logger.warn(
      //   "This links set doesn't have a valid header associated with it."
      // );
    }
  }

  // firstUpdated() {
  //   this.build();
  // }
  //
  // async build(): Promise<void> {
  //   // get a list of rh-footer-links items
  //   if (this.shadowRoot) {
  //     const children = this.shadowRoot
  //       .querySelector('slot')
  //       ?.assignedElements({ flatten: true });
  //     if (children && children.length > 0) {
  //       const linkSets: LinkSet[] | undefined = this.querySelectorAll(':scope > [dynamic-slot="panel"]')
  //         .map(item => ({
  //           // for each header we need to create an array of panel items that it's associated with.
  //           header: item.querySelector('[slot="header"]'),
  //           // collect all of the rh-footer-link items and add attributes
  //           panel: [...item.querySelectorAll('rh-footer-link')].map(child => {
  //             // ensure it has a class of .link
  //             child.classList.add('link');
  //             // ensure it has a part name of link
  //             child.setAttribute('part', 'link');
  //             return child;
  //           }),
  //         }));
  //
  //       if (linkSets) {
  //         this.linkSets = linkSets;
  //       }
  //     }
  //   }
  // }

  firstUpdated() {
    this.build();
  }

  async build(): Promise<void> {
    // we need to loop over dynamic slots and change them
    [''].
    [...this.querySelectorAll('[dynamic-slot]')].forEach((item, index) => {
      if (this.mobile) {
        const type = item.getAttribute('dynamic-slot');
        if (type === 'panel') {
          item.setAttribute('slot', `panel-${index}`);
        }
        else if (type === 'header') {
          item.setAttribute('slot', `header-${index}`);
        }
      }
    });
    this.requestUpdate();
  }

  render() {
    return html`
      ${this.mobile ? html`
        <pfe-accordion>
          ${[...this.querySelectorAll('[dynamic-slot="panel"]')].map((_, index) => html`
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

customElements.define('rh-footer-links', RhFooterLinks);
