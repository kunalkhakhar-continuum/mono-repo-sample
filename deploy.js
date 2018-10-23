const path = require('path');
var execSync = require('child_process').execSync;
const exec = (command) => execSync(command, { encoding: 'utf8' }).trim();
const LERNA_BIN = path.join(exec('npm bin'), 'lerna');
console.log(`LERNA_BIN: ${LERNA_BIN}`);
const lerna = (args) => exec(`${LERNA_BIN} ${args}`);

const split = (pattern) => (chars) => chars.split(pattern);
const zip = (destination, source) => { 
    console.log(`destination: ${destination}`);
    return Object.assign(destination, { [source[0]]: source[1] })
};

const isPkg = (tag) => tag.match(/[\w-]+@\d+\.\d+\.\d+(-[\w\d]+)?/);

const updatedPackages = exec('git tag --list --contain HEAD')
  .split('\n')
  .filter(isPkg)
  .map(split('@'))
  .reduce(zip, {})
;

console.log(`updatedPackages.length: ${JSON.stringify(updatedPackages)}`);
for (const pkg of Object.keys(updatedPackages)) {
  const version = updatedPackages[pkg];
  console.log(pkg);
  lerna(`--scope ${pkg} exec -- npm publish`);
}