import esbuild from 'esbuild';
import copy from 'recursive-copy';
import replace from 'replace-in-file';

esbuild
  .build({
    entryPoints: ['rh-footer.js'],
    entryNames: '[name]',
    outdir: 'deploy',
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
    await copy('assets', 'deploy/assets', { overwrite: true });
    // copy the assets directory into the build directory
    await copy('demo/index.html', 'deploy/index.html', { overwrite: true });
    // rewrite the entrypoint in the demo file
    await replace({
      files: 'deploy/index.html',
      from: /src\=\"\/demo\/index\.js\"/g,
      to: 'src="index.js"'
    })
    result.stop;
  })
  .catch(error => console.error(error));