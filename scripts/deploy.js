import esbuild from 'esbuild';
import copy from 'recursive-copy';
import replace from 'replace-in-file';

esbuild
  .build({
    entryPoints: ['dist/rh-footer.js'],
    entryNames: '[name]',
    outdir: 'public',
    format: 'esm',
    allowOverwrite: true,
    bundle: true,
    treeShaking: true,
    legalComments: 'linked',
    watch: Boolean(process.env.WATCH) || false,
    logLevel: 'info',
    sourcemap: true,
    minify: true,
  })
  .then(async result => {
    // copy the assets directory into the build directory
    await copy('assets', 'public/assets', { overwrite: true });
    // copy the assets directory into the build directory
    await copy('demo/index.html', 'public/index.html', { overwrite: true });
    // rewrite the entrypoint in the demo file
    await replace({
      files: 'public/index.html',
      from: /\.\.\/dist\//g,
      to: ''
    })
    result.stop;
  })
  .catch(error => console.error(error));