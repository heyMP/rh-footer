import express from 'express';
import proxy from 'express-http-proxy';
import { render } from '@lit-labs/ssr/lib/render-with-global-dom-shim.js';
import { Readable } from 'stream';
import { html } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import './rh-footer.js';

const PROXY_FQDN = process.env.PROXY_FQDN ?? 'http://localhost:8000';
const PORT = process.env.PORT ?? '3000';
const app = express();

app.use(function (req, res, next) {
	window.location = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
  next();
});

app.use('/', proxy(PROXY_FQDN, {
	userResDecorator: function (proxyRes, proxyResData) {
		return new Promise((resolve, reject) => {
			if (proxyRes.headers['content-type'] === 'text/html; charset=utf-8') {
				rhEdgeProcess(proxyResData.toString())
					.then(res => {
						resolve(res);
					})
			}
			else {
				resolve(proxyResData);
			}
		})
	}
}));

// lit-ssr version
const rhEdgeProcess = async (content) => {
	return await readStream(Readable.from(render(html`${unsafeHTML(content)}`)));
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

app.listen(PORT, () => console.log(`Listening on port 3000`));