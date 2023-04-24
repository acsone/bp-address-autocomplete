import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: './dist/bp-address-autocomplete.js',
  output: {
    file: 'bp-address-autocomplete.bundled.js',
    format: 'esm',
  },
    plugins: [nodeResolve()]

};
