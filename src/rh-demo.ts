import { LitElement, html } from 'lit';

export class RhDemo extends LitElement {
  constructor() {
    super();
    import('@patternfly/pfe-accordion/dist/pfe-accordion.js');
    // @ts-ignore
    import('https://unpkg.com/@lrnwebcomponents/code-sample?module');
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }

  firstUpdated() {
    this.syncCodeEditor();
  }

  public syncCodeEditor() {
    const template = this.querySelector('template');
    if (template) {
      const output = this.renderRoot.querySelector(
        '.rh-demo-code-area template'
      );
      if (output) {
        output.innerHTML = template.innerHTML;
        this.syncPreview();
      }
    }
  }

  public syncPreview() {
    const preview = this.renderRoot.querySelector('.rh-demo-preview-area');
    if (preview) {
      preview.innerHTML =
        this.renderRoot.querySelector('.rh-demo-code-area template')
          ?.innerHTML || '';
    }
  }

  render() {
    return html`
      <style>
        pfe-accordion {
          --pfe-accordion--MaxWidth--content: none;
        }

        code-sample {
          display: flex;
          flex: 1 1 auto;
          flex-direction: column;
        }
      </style>
      <div class="rh-demo-preview-area"></div>
      <div part="code" class="rh-demo-code-area">
        <pfe-accordion>
          <pfe-accordion-header>
            <h3>View code</h3>
          </pfe-accordion-header>
          <pfe-accordion-panel>
            <code-sample>
              <template></template>
            </code-sample>
          </pfe-accordion-panel>
        </pfe-accordion>
      </div>
    `;
  }
}

customElements.define('rh-demo', RhDemo);
