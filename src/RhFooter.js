import { html, css, LitElement } from 'lit';

export class RhFooter extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        background: var(--rh-footer__surface, #212427);
        --_iconGap: var(--rh-footer__iconGap, 24px);
      }

      #header {
        display: grid;
        grid-template-columns: repeat(12, 1fr [col-start]);
        width: 100%;
        padding: 32px 64px;
      }
      #header__left {
        grid-column-start: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      #header__right {
        grid-column-start: 8;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

      :host slot[name="header__right"]::slotted(rh-footer-social-icon) {
        margin-left: calc(var(--_iconGap) / 2);
        margin-right: calc(var(--_iconGap) / 2);
      }
    `;
  }

  static get properties() {
    return {
      logo: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.logo = 'https://static.redhat.com/libs/redhat/brand-assets/2/corp/logo--on-dark.svg';
  }

  firstUpdated() {
    this.shadowRoot.querySelector('slot[name=header__right]').addEventListener('slotchange', this._slotChangeHandler.bind(this));
  }

  _slotChangeHandler(e) {
    console.log(e);
  }

  renderLogo() {
    return html`
      <div id="logo">
        <a href="/en" title="Red Hat">
          <img id="logo__image" class="redhat-logo" src=${this.logo} alt="" aria-hidden="true" style="width:156px;">
        </a>
      </div>
    `;
  }

  render() {
    return html`
      <div id="header">
        <div id="header__left">
          ${this.renderLogo()}
          <slot name="header__left"></slot>
        </div>
        <div id="header__right">
          <slot name="header__right"></slot>
        </div>
      </div>

      <div id="main">
        <div id="header__left">
          <slot name="main__left"></slot>
        </div>
        <div id="header__right">
          <slot name="main__right"></slot>
        </div>
      </div>
    `;
  }
}