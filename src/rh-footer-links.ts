import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller';
import { bound, initializer } from '@patternfly/pfe-core/decorators';
import { Logger } from '@patternfly/pfe-core/controllers/logger';
import { getRandomId } from '@patternfly/pfe-core/functions/random';

export class RhFooterLinks extends LitElement {

	private logger = new Logger(this);

	private slots = new SlotController(this, {
		slots: ['header'],
	});

	static get styles() {
		return css`
			:host {
				display: flex;
				flex-direction: column;
				gap: 10px;
			}
			::slotted(:is(h1,h2,h3,h4,h5)) {
				font-weight: 500;
				font-size: 14px;
				margin-top: 0;
				margin-bottom: 0;
			}
		`;
	}

	constructor() {
		super();
	}

	@initializer()
	protected _init(records: MutationRecord[]) {
		this.updateAccessibility();
	}

	public updateAccessibility() {
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
		else {
			// if there is no header then we need to remove aria-labelledby
			this.removeAttribute('aria-labelledby');
		}
	}

	render() {
		return html`
			<slot name="header"></slot>
			<slot></slot>
	`;
	}
}

customElements.define('rh-footer-links', RhFooterLinks);