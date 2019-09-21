import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';

const plugins = [
  commonjs(),
  resolve(),
  babel(),
  terser()
];

export default {
  input: 'src/index.js',
  output: {
    format: 'cjs',
    file: 'lib/index.js'
  },
  plugins
};
