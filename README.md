# \<rh-footer>

## Quick start

```html
<html>
  <body>
    <rh-footer></rh-footer>
  </body>
</html>
```

## Installation

Install rh-footer

```bash
npm install rh-footer
```

Import rh-footer into your js.

```js
import 'rh-footer';
```

Use in your HTML

```html
<html>
  <body>
    <rh-footer></rh-footer>
  </body>
</html>
```

Ensure you are loading Red Hat fonts.

```html
<link
  type="text/css"
  rel="stylesheet"
  href="https://static.redhat.com/libs/redhat/redhat-font/6/webfonts/red-hat-font.min.css"
  media="all"
/>
```

## Usage

```html
<section>
  <h2>Regions: Level 1</h2>
  <rh-footer debug>
    <div slot="header"></div>
    <div slot="main"></div>
    <div slot="footer"></div>
  </rh-footer>
</section>

<section>
  <h2>Regions: Level 2</h2>
  <rh-footer debug>
    <div slot="header-primary"></div>
    <div slot="header-secondary"></div>
    <div slot="main-primary"></div>
    <div slot="main-secondary"></div>
    <div slot="footer-primary"></div>
    <div slot="footer-secondary"></div>
    <div slot="footer-tertiary"></div>
  </rh-footer>
</section>

<section>
  <h2>Customize Logo:</h2>
  <rh-footer>
    <a slot="logo" href="#" title="Cool Website">
      <img src="https://via.placeholder.com/156x50" style="width:156px;" />
    </a>
  </rh-footer>
</section>
<section>
  <h2>Custom social links: Github</h2>
  <rh-footer>
    <rh-footer-social-link slot="social-links-end" icon="web-icon-github"
      ><a href="#github">Github</a></rh-footer-social-link
    >
  </rh-footer>
</section>

<section>
  <h2>Custom links</h2>
  <rh-footer>
    <rh-footer-links slot="links">
      <h3 slot="header">Custom</h3>
      <rh-footer-link><a href="#">Custom Link</a></rh-footer-link>
      <rh-footer-link><a href="#">Custom Link</a></rh-footer-link>
      <rh-footer-link><a href="#">Custom Link</a></rh-footer-link>
      <rh-footer-link><a href="#">Custom Link</a></rh-footer-link>
      <rh-footer-link><a href="#">Custom Link</a></rh-footer-link>
    </rh-footer-links>
    <rh-footer-links slot="links">
      <h3 slot="header">Custom</h3>
      <rh-footer-link><a href="#">Custom Link</a></rh-footer-link>
      <rh-footer-link><a href="#">Custom Link</a></rh-footer-link>
      <rh-footer-link><a href="#">Custom Link</a></rh-footer-link>
      <rh-footer-link><a href="#">Custom Link</a></rh-footer-link>
      <rh-footer-link><a href="#">Custom Link</a></rh-footer-link>
    </rh-footer-links>
    <rh-footer-links slot="links">
      <h3 slot="header">Custom</h3>
      <rh-footer-link><a href="#">Custom Link</a></rh-footer-link>
      <rh-footer-link><a href="#">Custom Link</a></rh-footer-link>
      <rh-footer-link><a href="#">Custom Link</a></rh-footer-link>
      <rh-footer-link><a href="#">Custom Link</a></rh-footer-link>
      <rh-footer-link><a href="#">Custom Link</a></rh-footer-link>
    </rh-footer-links>
    <rh-footer-links slot="links">
      <h3 slot="header">Custom</h3>
      <rh-footer-link class="link" part="link"
        ><a href="#">Custom Link</a></rh-footer-link
      >
      <rh-footer-link class="link" part="link"
        ><a href="#">Custom Link</a></rh-footer-link
      >
      <rh-footer-link class="link" part="link"
        ><a href="#">Custom Link</a></rh-footer-link
      >
      <rh-footer-link class="link" part="link"
        ><a href="#">Custom Link</a></rh-footer-link
      >
      <rh-footer-link class="link" part="link"
        ><a href="#">Custom Link</a></rh-footer-link
      >
    </rh-footer-links>
  </rh-footer>
</section>
```

## Development

Start the web-dev-server.

```bash
npm run start
```

Visit http://localhost:8000/demo/

## Server Side Rendering Proxy

This is an experiment with using the @lit-labs/ssr package to provide
server side rendering for this component.

### Start the proxy server

While the web-dev-server is running on port 8000, start the proxy server.

```bash
npm run start:proxy
```

Visit http://localhost:8001/demo/

## Notes

### Modifications to Open-WC starter kit

Modified tsconfig.json

```json
{
  "compilerOptions": {
		...
    "target": "esnext",
    "rootDir": "./src",
    "useDefineForClassFields": false
  },
  "include": ["src/*.ts"]
}
```

Added `scripts/build.js`

Added build step to package.json

```json
{
	...
	"scripts": {
		"build": "tsc && npm run analyze -- --exclude public && npm run build:deploy",
		"build:deploy": "node ./scripts/deploy.js",
	}
}
```
