import { LitElement, html, css, CSSResultGroup } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { property } from 'lit/decorators.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller';
import { bound, initializer, observed } from '@patternfly/pfe-core/decorators';
import { Logger } from '@patternfly/pfe-core/controllers/logger';
import { getRandomId } from '@patternfly/pfe-core/functions/random';

export class RhFooterLinks extends LitElement {
  /**
   * Visibily hide the header slot. Setting this to true will not affect
   * aria-labelledby.
   */
  @property({ type: Boolean, attribute: 'header-hidden', reflect: true })
  public headerHidden: boolean = false;

  private logger = new Logger(this);

  private slots = new SlotController(this, {
    slots: ['header'],
  });

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

  constructor() {
    super();
  }

  @initializer()
  protected _init(records: MutationRecord[]) {
    this.updateAccessibility();
  }

  public updateAccessibility() {
    // set the role for this element to be a list item
    this.setAttribute('role', 'list');
    // ensure we've rendered to our shadowroot
    const header: HTMLElement | null = this.querySelector('[slot="header"]');
    if (header) {
      // ensure there is an id on the header slot
      const headerId = header.id || getRandomId('rh-footer-links');
      if (headerId !== header.id) header.id = headerId;
      header.id = headerId;
      this.setAttribute('aria-labelledby', headerId);
    }
  }

  render() {
    return html`
      <div part="header" class="header">
        <slot name="header"></slot>
      </div>
      <div part="default" class="default">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('rh-footer-links', RhFooterLinks);
