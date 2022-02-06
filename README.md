# \<rh-footer>

## Start Development Server

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