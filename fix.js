/* eslint-disable no-restricted-syntax */

const { existsSync, renameSync, readdirSync } = require('fs');
const { join } = require('path');

const packagesPath = join(__dirname, 'packages');
const packages = readdirSync(packagesPath);

for (const package of packages) {
  const typingsPath = join(packagesPath, package, 'typings');
  const typingsPackagePath = join(typingsPath, package, 'src');

  if (existsSync(typingsPath) && existsSync(typingsPackagePath)) {
    const files = readdirSync(typingsPackagePath);

    for (const file of files) {
      renameSync(join(typingsPackagePath, file), join(typingsPath, file));
    }
  }
}
