import { html, css, LitElement, adoptStyles, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

export class RhFooter extends LitElement {
  static get translations() {
    return {
      'es': {
        "About Red Hat": "Acerca de Red Hat",
        "Jobs": "Trabajos",
        "Events": "Eventos",
        "Locations": "Ubicaciones",
        "Contact Red Hat": "Comuníquese con Red Hat",
        "Red Hat Blog": "Blog de Red Hat",
        "Cool Stuff Store": "Tienda Cool Stuff",
        "Privacy statement": "Declaracion de privacidad",
        "Terms of use": "Condiciones de uso",
        "All policies and guidelines": "Todas las políticas y pautas",
        "Cookie preferences and Do not sell my info": "Preferencias de cookies y No vender mi información"
      },
      'zh': {
        "About Red Hat": "关于红帽",
        "Jobs": "工作",
        "Events": "活动",
        "Locations": "地点",
        "Contact Red Hat": "联系红帽",
        "Red Hat Blog": "红帽博客",
        "Cool Stuff Store": "很酷的东西商店",
        "Privacy statement": "Declaracion de privacidad",
        "Terms of use": "隐私声明",
        "All policies and guidelines": "使用条款",
        "Cookie preferences and Do not sell my info": "Cookie 所有政策和指南"
      }
    }
  }

  translate(string) {
    if (
      typeof this.constructor.translations[this._lang] !== "undefined" &&
      typeof this.constructor.translations[this._lang][string] !== "undefined"
    ) {
      return this.constructor.translations[this._lang][string];
    }
    else {
      return string;
    }
  }

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
          display: inline-block;
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
          grid-template-columns: repeat(4, 1fr);
          grid-gap: 32px;
        }

        .footer--description-paragraph {
          color: #d2d2d2;
          font-size: 14px;
          margin-bottom: 32px;
          line-height: 21px;
        }
        .footer--description-title,
        slot[name="description-tray"]::slotted([data-title]) {
          font-weight: 500;
          font-size: 14px;
          color: #fff;
        }
        .footer--description hr {
          margin: 32px 0;
          border-color: #6a6e73;
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

  static get properties() {
    return {
      logo: {
        type: String,
      },
      logoTitle: {
        type: String,
      },
      links: {
        type: Array,
      },
      socialLinks: {
        type: Array,
      },
      description: {
        type: Object,
      },
      languageSwitcher: {
        type: Boolean,
        attribute: 'language-switcher',
        reflect: true
      },
      _lang: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.logo =
      'https://static.redhat.com/libs/redhat/brand-assets/2/corp/logo--on-dark.svg';
    this.logoTitle = 'Red Hat logo';
    this.links = [];
    this.socialLinks = [];
    this.description = {};
    this.languageSwitcher = false;
    this._lang = 'en';
    this._langChangeHandler();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('languagechange', this._langChangeHandler.bind(this));
    // load these lazily, outside of the constructor. Must do this for SSR to work
    import("@patternfly/pfe-icon/dist/pfe-icon.js");
    import("@patternfly/pfe-cta/dist/pfe-cta.js");
  }

  disconnectedCallback() {
    window.removeEventListener('languagechange', this._langChangeHandler.bind(this));
    super.disconnectedCallback();
  }

  firstUpdated() {
    [...this.shadowRoot.querySelectorAll('slot')].forEach(slot => {
      slot.addEventListener('slotchange', this._slotChangeHandler.bind(this));
    });
  }

  _slotChangeHandler(e) {
    const name = e.path[0].name ?? '';
    switch (name) {
      case 'styles':
        this.getAdoptedStyles();
        break;
      case 'social-links':
        this.updateSocialLinks();
        break;
      case 'links':
        this.updateLinks();
        break;
      case 'description':
        this.updateDescription();
        break;
      default:
        break;
    }
  }

  getAdoptedStyles() {
    const stylesTemplate = this.shadowRoot
      .querySelector('slot[name=styles]')
      .assignedNodes()[0];
    if (stylesTemplate) {
      try {
        const styles =
          stylesTemplate.content.querySelector('style').textContent;
        adoptStyles(this.shadowRoot, [
          ...this.constructor.styles,
          css`
            ${unsafeCSS(styles)}
          `,
        ]);
      } catch (e) {
        console.error(e.message);
      }
    }
  }

  updateSocialLinks() {
    const socialLinksUL = [
      ...this.querySelectorAll(`[slot="social-links"]`)
    ].filter(item => item.nodeName === 'UL')[0];
    const links = [...socialLinksUL.querySelectorAll('li')];
    this.socialLinks = links;
  }

  updateLinks() {
    const links = [...this.querySelectorAll(`[slot="links"]`)]
      .map(item => ({
        header: item.querySelector('[data-header]'),
        ul: item.querySelector('ul'),
      }));
    this.links = links;
  }

  updateDescription() {
    const description = [...this.querySelectorAll(`[slot="description"]`)]
      .map(item => {
        if (item.hasAttribute('data-title')) {
          item.classList.add('footer--description-title');
        }
        else {
          item.classList.add('footer--description-paragraph');
        }
        return item;
      });
    const title = description.find(i => i.hasAttribute('data-title'));
    const paragraphs = description.filter(i => i !== title);
    this.description = Object.assign({ title, paragraphs });
  }

  renderLogo() {
    return html`
      <div id="logo">
        <a href="/en" title="Red Hat">
          <img
            id="logo__image"
            class="redhat-logo"
            src=${this.logo}
            alt=""
            aria-hidden="true"
            style="width:156px;"
          />
        </a>
      </div>
    `;
  }

  renderSocialLinks(socialLinks) {
    return html`
      <div class="footer--social-links">
        ${socialLinks.map(link => html`${this.renderSocialLink(link)}`)}
      </div>
    `;
  }

  renderSocialLink(link) {
    return html`
      <a href=${link.querySelector('a').getAttribute('data-icon')} class="footer--social-link ${link.getAttribute('class')}"
        ><pfe-icon icon="web-icon-${link.getAttribute('data-icon')}"></pfe-icon
      ></a>
    `;
  }

  renderLinks(links) {
    return html`
      ${links.map(link => this.renderLink(link))}
    `;
  }

  renderLink(link) {
    return html`
      <div class="footer--list">
        ${link.header.classList.add('footer--list-header') ?? link.header}
        ${link.ul}
      </div>
    `;
  }

  renderDescription({ title = null, paragraphs = [] }) {
    return html`
      ${title
        ? html`${unsafeHTML(title.outerHTML)}`
        : html` <h3 class="footer--description-title">About Red Hat</h3> `}
      ${paragraphs.map(paragraph => html`${unsafeHTML(paragraph.outerHTML)}`)}
      <p class="footer--description-paragraph">
        We’re the world’s leading provider of enterprise open source
        solutions―including Linux, cloud, container, and Kubernetes. We deliver
        hardened solutions that make it easier for enterprises to work across
        platforms and environments, from the core datacenter to the network
        edge.
      </p>
    `;
  }

  renderDescriptionItem(item) {
    return html`
      ${item}
    `;
  }

  render() {
    return html`
      <slot name="styles" hidden></slot>
      <footer>
        <div class="footer--container">
          <section class="footer--header">
            <div class="footer--header-section">
              <img src=${this.logo} alt=${this.logoTitle}>
            </div>
            <div class="footer--header-section">
              ${
                this.socialLinks ? this.renderSocialLinks(this.socialLinks) : ``
              }
              <slot name="social-links" hidden></slot>
            </div>
          </section>
          <section class="footer--body">
            <div class="footer--body-container">
              <div class="footer--list-container">
                ${this.links ? html`${this.renderLinks(this.links)}` : ''}
                <slot name="links" hidden></slot>
              </div>
              <div class="footer--container-item">
                <div class="footer--description">

                  ${this.renderDescription(this.description)}
                  <slot name="description" hidden></slot>

                  <slot name="description-tray"></slot>
                  <hr>
                  <slot name="description-tray-footer"></slot>

                  ${
                    this.languageSwitcher
                      ? html`
                          <p class="footer--description-title">
                            Select a language
                          </p>
                          <img src=${new URL('../assets/language-switcher.png', import.meta.url)}>
                        `
                      : ''
                  }
                </div>
              </div>
            </div>
        </div>
        <section class="footer--global">
          <div class="footer--container">
            <div class="footer--layout-special">
              <div class="footer--logo">
                <img src="${new URL('../assets/small-logo-on-dark.png', import.meta.url)}" />
              </div>
              <div class="group">
                <div class="footer--global-list">
                  <ul>
                    <li><a href="#">${this.translate('About Red Hat')}</a></li>
                    <li><a href="#">${this.translate('Jobs')}</a></li>
                    <li><a href="#">${this.translate('Events')}</a></li>
                    <li><a href="#">${this.translate('Locations')}</a></li>
                    <li><a href="#">${this.translate('Contact Red Hat')}</a></li>
                    <li><a href="#">${this.translate('Red Hat Blog')}</a></li>
                    <li><a href="#">${this.translate('Cool Stuff Store')}</a></li>
                  </ul>
                </div>
                <div class="footer--legal">
                  <p>Copyright ®2021 Red Hat, Inc.</p>
                  <ul>
                    <li><a href="#">${this.translate('Privacy statement')}</a></li>
                    <li><a href="#">${this.translate('Terms of use')}</a></li>
                    <li><a href="#">${this.translate('All policies and guidelines')}</a></li>
                    <li><a href="#">${this.translate('Cookie preferences and Do not sell my info')}</a></li>
                  </ul>
            </div>
          </div>
          <div class="footer--promo">
            <img src="${new URL('../assets/summit-logo.png', import.meta.url)}" />
          </div>
        </section>
      </div>
      <slot hidden></slot>
    </footer>
    `;
  }

  _langChangeHandler() {
    if (document.querySelector) {
      const lang = document?.querySelector('[lang]')?.getAttribute('lang');
      if (lang) {
        this._lang = lang;
      }
    }
  }
}