import { parse } from 'parse5';
import { toHtml } from 'hast-util-to-html';
import { select, selectAll } from 'hast-util-select';
import { fromParse5 } from 'hast-util-from-parse5';
import {findAndReplace} from 'hast-util-find-and-replace';
import { fromDom } from 'hast-util-from-dom';
import { h } from 'hastscript';
import { html, render } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import '../rh-footer.js';

// export default function ssr(content) {
// 	const tree = fromParse5(parse(content));
// 	const rhFooters = selectAll('rh-footer', tree);
// 	for (let item of rhFooters) {
// 		processItem(item);
// 	}
// 	return toHtml(tree);
// }

// const processItem = (tree) => {
// 	let props = {};
// 	// language switcher
// 	if (typeof tree.properties['language-switcher'] !== undefined) {
// 		props.languageSwitcher = true;
// 	}
// 	const newTemplate = html`<rh-footer></rh-footer>`;
// 	console.log(newTemplate);
// }

export default function ssr(content) {
	const tree = fromParse5(parse(content));
	const rhFooters = select('rh-footer', tree);
	return html`${unsafeHTML(toHtml(rhFooters))}`;
}