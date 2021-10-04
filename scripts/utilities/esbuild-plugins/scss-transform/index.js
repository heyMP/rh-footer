import sass from 'node-sass';
import { dirname, resolve, join } from 'path';
import fs from 'fs';

function pathResolve({ resolveDir, path, importer }) {
  return resolve(resolveDir || dirname(importer), path);
}

function getContents(type = null, contents) {
  if (type === 'css') {
    return contents.css.toString();
  } else {
    return `
import { css } from "lit-element";
export default css\`
${contents.css.toString()}\``;
  }
}

/**
 * Enum scssTransformOptions.
 * @readonly
 * @enum {object}
 */
var scssTransformOptions = {
  /** @type {boolean} */
  rewriteImports: false,
};

/**
 * ESBuild SCSS Transform Plugin
 * @param {scssTransformOptions} options
 */
const scssTransform = function (options = scssTransformOptions) {
  return {
    name: 'scsstransform',
    setup(build) {
      // look for sass files
      build.onResolve({ filter: /\.scss$/ }, args => {
        return {
          path: pathResolve(args),
          namespace: 'scsstransform',
          pluginData: args,
        };
      });

      // convert sass files into js files using node-sass and the
      // getContents function above with wraps it in a css tagged template
      // litteral and exports is properly
      build.onLoad({ filter: /./, namespace: 'scsstransform' }, args => {
        const compiled = sass.renderSync({
          file: args.path,
          includePaths: ['./node_modules/'],
          outputStyle: 'compressed',
        });
        return {
          contents: getContents(options.type, compiled),
          loader: options.type === 'css' ? 'css' : 'js',
          resolveDir: dirname(args.pluginData.resolveDir),
          watchFiles: [args.path],
        };
      });

      // If we have the rewrite imports option on then we are going
      // to look for imports that have the .scss ending and rewrite
      // them to .js to reflect changes from the previous step above.
      if (options.rewriteImports) {
        build.onLoad({ filter: /\.js$/ }, args => {
          const source = fs.readFileSync(args.path, 'utf8');
          const contents = source.replace(
            /\.(scss)(\"|\'|`)/g,
            `.${options.type === 'css' ? 'css' : 'js'}$2`
          );
          return {
            contents,
          };
        });
      }
    },
  };
};

export default scssTransform;
