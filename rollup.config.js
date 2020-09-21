import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import { join, resolve as pathResolve } from 'path';
import typescript from 'rollup-plugin-typescript2';

const PACKAGE_ROOT_PATH = process.cwd();
const PKG = require(join(PACKAGE_ROOT_PATH, 'package.json')); // eslint-disable-line import/no-dynamic-require, @typescript-eslint/no-var-requires

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
  input: join(PACKAGE_ROOT_PATH, 'src/index.ts'),
  external: getExternal(),
  output: [
    {
      format: 'cjs',
      sourcemap: true,
      file: pathResolve(PACKAGE_ROOT_PATH, 'dist/index.js'),
    },
    {
      format: 'es',
      sourcemap: true,
      file: pathResolve(PACKAGE_ROOT_PATH, 'dist/index.es.js'),
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
        include: [pathResolve(PACKAGE_ROOT_PATH, 'src/**/*')],
        compilerOptions: {
          declarationMap: true,
          declarationDir: pathResolve(PACKAGE_ROOT_PATH, 'typings'),
        },
      },
    }),
  ],
};
