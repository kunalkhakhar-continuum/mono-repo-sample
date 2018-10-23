const path = require('path');
const log = (message) => {
    console.log('*****************');
    console.log(message);
};
var execSync = require('child_process').execSync;
const exec = (command) => execSync(command, { encoding: 'utf8' }).trim();
const LERNA_BIN = path.join(exec('npm bin'), 'lerna');
log(`LERNA_BIN: ${LERNA_BIN}`);
const lerna = (args) => { 
    log(`executing lerna command: ${LERNA_BIN} ${args}`);
    return exec(`${LERNA_BIN} ${args}`);
}

const split = (pattern) => (chars) => chars.split(pattern);
const zip = (destination, source) => { 
    log(`destination: ${destination}`);
    return Object.assign(destination, { [source[0]]: source[1] })
};

const isPkg = (tag) => tag.match(/[\w-]+@\d+\.\d+\.\d+(-[\w\d]+)?/);

const checkIfAnyPackageUpdated = (output) => {
    const stdout = output.split('\n').reverse();
    if (stdout[0] === 'lerna info No changed packages found') {
        log(stdout[0]);
        return false;
    }

    return true;
}

const isEndofPackageList = (line) => line.indexOf('lastTagName:') > -1;

const getChangedPackages = (output) => {
    const stdout = output.split('\n').reverse();
    log('getChangedPackages: ' +stdout);
    let i = 0;
    const packages = [];
    while(!isEndofPackageList(stdout[i])) {
        packages.push(stdout[i]);
        i++;
    }

    return packages;
}

buildAllPackages = () => {
    for (const pkg of Object.keys(updatedPackages)) {
        const version = updatedPackages[pkg];
        console.log(pkg);
        lerna(`--scope ${pkg} run -- npm build:dt`);
    }
}

let changedPackages;
const allManagedPackages = lerna('ls'); // list all managed packages

try {
    const output = lerna('changed'); // get only the packages that have updated since last tag
} catch(e) {
    // lerna throws an error in case there are no changed packages
    log('there are no changed packages, hence build all packages');
    buildAllPackages();
}

if (checkIfAnyPackageUpdated(output)) {
    log(output);
    changedPackages = getChangedPackages(output);
    log('list of changed packages: '+changedPackages);
} else {
    log(output);
}

// if (changedPackages.length === 0) {
//     log('No changed packaged are found, will rebuild all packages')
//     buildAllPackages()
// }

// const updatedPackages = exec('git tag --list --contain HEAD')
//   .split('\n')
//   .filter(isPkg)
//   .map(split('@'))
//   .reduce(zip, {})
// ;

// console.log(`updatedPackages.length: ${JSON.stringify(updatedPackages)}`);
// for (const pkg of Object.keys(updatedPackages)) {
//   const version = updatedPackages[pkg];
//   console.log(pkg);
//   lerna(`--scope ${pkg} exec -- npm publish`);
// }