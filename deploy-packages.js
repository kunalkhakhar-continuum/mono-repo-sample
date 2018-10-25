module.exports  = function () {

    const getEnv = require('./deploy-utils.js').getEnv
    const NODE_ENV = process.env.NODE_ENV;
    const path = require('path');
    const execSync = require('child_process').execSync;
    const split = (pattern) => (chars) => chars.split(pattern);

    let changedPackages;
    let allPackagesBuilt = false;

    const log = (message) => {
        console.log('*******BEGIN**********');
        console.log(message);
        console.log('*******END**********');
    };

    const exec = (command) => execSync(command, { encoding: 'utf8' }).trim();
    const LERNA_BIN = path.join(exec('npm bin'), 'lerna');

    log(`LERNA_BIN: ${LERNA_BIN}`);
    log(`NODE_ENV: ${NODE_ENV}`);

    const lerna = (args) => { 
        log(`executing lerna command: ${LERNA_BIN} ${args}`);
        return exec(`${LERNA_BIN} ${args}`);
    }


    const allManagedPackages = lerna('ls').split('\n'); // list all managed packages

    const isEndofPackageList = (line) => line.indexOf('lastTagName:') > -1;

    const getChangedPackages = (output) => {
        const stdout = output.split('\n').reverse();
        let i = 0;
        const packages = [];
        while(!isEndofPackageList(stdout[i])) {
            packages.push(stdout[i]);
            i++;
        }

        return packages;
    }

    const buildPackages = (packages) => {
        packages.forEach(pkg => {
            log(`lerna --scope ${pkg} run -- build:webpack`);
            lerna(`--scope ${pkg} run build:webpack`);
        });
    }

    const buildRemainingPackages = () => {
        const packages = allManagedPackages.filter(item => changedPackages.indexOf(item) === -1)
        buildPackages(packages);
    }

    const deployPackages = () => {
        try {
            const output = lerna('changed'); // get only the packages that have updated since last tag
            log(output);
            changedPackages = getChangedPackages(output);
            lerna('publish prerelease --yes');
            buildRemainingPackages();
        } catch(e) {
            // lerna throws an error in case there are no changed packages
            log('there are no changed packages to publish, hence build all packages');
            allPackagesBuilt = true;
            buildPackages(allManagedPackages);
            return;
        }
    }

    return {
        deploy: deployPackages
    }
}
