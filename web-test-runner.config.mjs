const filteredLogs = ['Running in dev mode', 'lit-html is in dev mode'];
import rollupReplace from '@rollup/plugin-replace';
import { fromRollup } from '@web/dev-server-rollup';
const replace = fromRollup(rollupReplace);

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  /** Test files to run */
  files: 'out-tsc/test/**/*.test.js',

  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  /** Filter out lit dev mode logs */
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (typeof arg === 'string' && filteredLogs.some(l => arg.includes(l))) {
        return false;
      }
    }
    return true;
  },

  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    })
  ],
});
