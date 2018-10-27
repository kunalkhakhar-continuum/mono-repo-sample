const path = require('path');
const { getEnv, addBuiltPackage, isPackageAlreadyBuilt } = require('../../../deploy-utils.js');
const NODE_ENV = getEnv();
const exec = require('../../../deploy-utils.js').exec;
console.log(`current env in prepare:: ${NODE_ENV}`)
const WEBPACK_BIN = path.join(exec('npm bin'), 'webpack');
console.log(`WEBPACK_BIN: ${WEBPACK_BIN}`);

const packageJsonFilePath = path.join(__dirname, "..", "package.json");
const packageVersion = require(packageJsonFilePath).version;
const packageName = require(packageJsonFilePath).version;
const packageNameAndVersion = `kunalkhakar-shared-${packageVersion}`;

if (!isPackageAlreadyBuilt(packageNameAndVersion)) {
    addBuiltPackage(packageNameAndVersion);
    // exec(`cross-env NODE_ENV=${NODE_ENV} ${WEBPACK_BIN} --config ../webpack/webpack.config.js --progress --profile --colors`);
    exec(`node ./build_dt_works.js`);
}
