import esbuild from 'esbuild';
import scssTransform from './utilities/esbuild-plugins/scss-transform/index.js';
import glob from 'glob';

/**
 * Dist directory
 *
 * This is what will be used for publishing to npm
 */
esbuild
  .build({
    entryPoints: ['rh-product-trial.js', ...glob.sync('src/**/**.{js,scss}')],
    entryNames: '[dir]/[name]',
    outdir: 'dist',
    format: 'esm',
    allowOverwrite: true,
    bundle: false,
    external: ['@patternfly*', 'lit*'],
    treeShaking: true,
    legalComments: 'linked',
    watch: Boolean(process.env.WATCH) || false,
    logLevel: 'info',
    sourcemap: false,
    plugins: [scssTransform({ rewriteImports: true })],
  })
  .then(result => result.stop)
  .catch(error => console.error(error));
