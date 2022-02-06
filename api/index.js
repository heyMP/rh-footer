import fetch from 'node-fetch';
import { render } from '@lit-labs/ssr/lib/render-with-global-dom-shim.js';
import { Readable } from 'stream';
import { html } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import '../src/rh-footer.js';

export default async function handler(req, res) {
	window.location = new URL(`${req.headers['x-forwarded-proto']}://${req.headers['x-vercel-deployment-url']}`);
	const response = await fetch(window.location);
	const body = await response.text();

	const ssrContent = await readStream(Readable.from(render(html`
		<script type="module" src="https://unpkg.com/lit/experimental-hydrate-support.js?module"></script>
		${unsafeHTML(body)}
	`)));

  res.status(200).send(ssrContent);
}

function readStream(stream, encoding = "utf8") {
	stream.setEncoding(encoding);
	return new Promise((resolve, reject) => {
			let data = "";
			stream.on("data", chunk => data += chunk);
			stream.on("end", () => resolve(data));
			stream.on("error", error => reject(error));
	});
}