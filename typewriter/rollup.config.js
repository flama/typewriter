import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

let external = Object.keys(pkg.peerDependencies || {}).concat(Object.keys(pkg.dependencies || {}))

export default {
  input: 'src/index.js',
  output: [{
    file: pkg.main,
    format: 'iife',
    name: pkg.name.split('/')[1],
    sourcemap: true,
    exports: 'named',
  }, {
    file: pkg.module,
    format: 'es',
    sourcemap: true,
    exports: 'named',
  }],
  external,
  plugins: [
    babel({
      sourceMap: true,
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    resolve({
      main: true,
    })
  ]
}
