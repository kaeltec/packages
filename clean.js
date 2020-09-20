const { spawn } = require('child_process');
const { readdirSync, existsSync } = require('fs');
const { join } = require('path');

const packagesPath = join(__dirname, 'packages');
const packages = readdirSync(packagesPath);

// eslint-disable-next-line no-restricted-syntax
for (const package of packages) {
  const packagePath = join(packagesPath, package);

  if (existsSync(join(packagePath, 'scripts', 'clean.js'))) {
    spawn('node', ['scripts/clean.js'], { cwd: packagePath });
  }
}
