/* eslint-disable no-restricted-syntax */

const { unlinkSync, existsSync, readdirSync } = require('fs');
const { join, resolve } = require('path');

const replaces = ['es.js', 'js'];
const rootPath = resolve(__dirname, '..');
const files = readdirSync(join(rootPath, 'src')).map(file =>
  join(rootPath, file),
);

for (const replace of replaces) {
  const filesParsed = files
    .map(file => file.replace(/ts$/, replace))
    .reduce((array, file) => array.concat([file, `${file}.map`]), []);

  for (const file of filesParsed) if (existsSync(file)) unlinkSync(file);
}
