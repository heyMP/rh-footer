import express from 'express';
import proxy from 'express-http-proxy';
import {render} from '@lit-labs/ssr/lib/render-with-global-dom-shim.js';
import { Readable } from 'stream';
import { renderLightdom } from './rh-footer.js';
// import { JSDOM } from 'jsdom';
// const ESI = require('nodesi');

// const esi = new ESI({});

const app = express();

app.use('/', proxy('http://localhost:8000', {
	userResDecorator: function (proxyRes, proxyResData) {
		return new Promise((resolve, reject) => {
			console.log(proxyRes.headers['content-type'])
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

const rhEdgeProcess = async (html) => {
	return await readStream(Readable.from(render(renderLightdom())));
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

app.listen(3000, () => console.log(`Listening on port 3000`));