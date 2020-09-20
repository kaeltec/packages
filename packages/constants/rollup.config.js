import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import fs from 'fs';
import path from 'path';
import typescript from 'rollup-plugin-typescript2';

const DIST_PATH = path.join(__dirname, 'dist');
const SOURCE_PATH = path.join(__dirname, 'src');
const PKG = require(path.join(__dirname, 'package.json')); // eslint-disable-line import/no-dynamic-require, @typescript-eslint/no-var-requires

function makeExternalPredicate(externalArr) {
  if (!externalArr.length) return () => false;
  return id => new RegExp(`^(${externalArr.join('|')})($|/)`).test(id);
}

function getExternal() {
  return makeExternalPredicate(
    Object.keys(PKG.peerDependencies || {}).concat(
      Object.keys(PKG.dependencies || {}),
    ),
  );
}

export default {
  external: getExternal(),
  input: fs.readdirSync(SOURCE_PATH).map(file => path.join(SOURCE_PATH, file)),
  output: [
    {
      format: 'cjs',
      exports: 'auto',
      sourcemap: true,
      dir: path.join(DIST_PATH, 'cjs'),
    },
    {
      format: 'es',
      sourcemap: true,
      entryFileNames: '[name].es.js',
      dir: path.join(DIST_PATH, 'es'),
    },
  ],
  plugins: [
    url(),
    resolve(),
    commonjs(),
    typescript({
      rollupCommonJSResolveHack: true,
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        include: [path.join(__dirname, 'src/**/*')],
        compilerOptions: {
          declarationMap: true,
          declarationDir: path.join(__dirname, 'typings'),
        },
      },
    }),
  ],
};
