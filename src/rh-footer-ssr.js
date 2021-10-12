import { parse } from 'parse5';
import { toHtml } from 'hast-util-to-html';
import { select, selectAll } from 'hast-util-select';
import { fromParse5 } from 'hast-util-from-parse5';
import {findAndReplace} from 'hast-util-find-and-replace';
import { fromDom } from 'hast-util-from-dom';
import { h } from 'hastscript';
import { html, render } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { unsafeStatic } from 'lit/static-html.js';
import '../rh-footer.js';

export default function ssr(content) {
	const tree = fromParse5(parse(content));
	const rhFooter = select('rh-footer', tree);
	const { properties } = rhFooter;
	const languageSwitcher = typeof properties['language-switcher'] !== "undefined" ? true : false;
	const socialLinks = selectAll('[slot="social-links"] li', rhFooter).map(li => ({
		href: select('a', li).properties.href,
		icon: li.properties.dataIcon,
		content: li.properties.dataIcon,
	}));
	return html`<rh-footer .languageSwitcher=${languageSwitcher} .socialLinks=${socialLinks}></rh-footer>`;
}