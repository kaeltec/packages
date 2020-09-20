/* eslint-disable no-restricted-syntax */

const { existsSync, readdirSync, copyFileSync } = require('fs');
const { join, resolve } = require('path');

const folders = ['cjs', 'es'];
const rootPath = resolve(__dirname, '..');

if (folders.every(folder => existsSync(join(rootPath, 'dist', folder)))) {
  for (const folder of folders) {
    const folderPath = join(rootPath, 'dist', folder);
    const files = readdirSync(folderPath);

    for (const file of files) {
      copyFileSync(join(folderPath, file), join(rootPath, file));
    }
  }
}
