var fs  = require("fs");
const path = require('path');
const _ = require('lodash');
const chalk = require('chalk');

const BUILT_PACKAGES_FILE = path.join(__dirname, 'builtPackages.properties');

let NODE_ENV = 'production';

const execSync = require('child_process').execSync;
const log = (message) => {
    console.log('*******BEGIN**********');
    console.log(chalk.green(message));
    console.log('*******END**********');
};

const exec = (command) => execSync(command, { encoding: 'utf8' }).trim();

const setEnv = (env) => {
    NODE_ENV = env;
}

const getEnv = () => {
    return process.env.NODE_ENV;
}

const getBuiltPackages = () => {
    return readBuiltPackagesFile();    
}

const readBuiltPackagesFile = () => {
    let builtPackages = ''; 
    fs.readFileSync(BUILT_PACKAGES_FILE).toString().split('\n').forEach(function (line) { 
        builtPackages = line;
    });

    return builtPackages;
}

const writeBuiltPackagesFile = (pkg) => {
    fs.readFileSync(BUILT_PACKAGES_FILE).toString().split('\n').forEach(function (line) { 
        let builtPackages;
        
        if (_.isEmpty(line)) {
            builtPackages = pkg;
        } else {
            builtPackages = `${line},${pkg}`;
        }
    
        log(`all built packages so far: ${builtPackages}`);
        fs.writeFileSync(BUILT_PACKAGES_FILE, builtPackages);
    });
}

const isPackageAlreadyBuilt = (pkg) => {
    const builtPackages = readBuiltPackagesFile();

    return builtPackages.indexOf(pkg) > -1;
}



const addBuiltPackage = (pkg) => {
    writeBuiltPackagesFile(pkg);
}

module.exports = {
    exec,
    log,
    getEnv,
    setEnv,
    getBuiltPackages,
    addBuiltPackage,
    isPackageAlreadyBuilt
}
