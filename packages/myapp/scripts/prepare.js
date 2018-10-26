const path = require('path');
const { getEnv, addBuiltPackage, isPackageAlreadyBuilt } = require('../../../deploy-utils.js');
const NODE_ENV = getEnv();
const exec = require('../../../deploy-utils.js').exec;
const WEBPACK_BIN = path.join(exec('npm bin'), 'webpack');

if (!isPackageAlreadyBuilt('kunalkhakar-myapp')) {
    addBuiltPackage('kunalkhakar-myapp');
    // exec(`cross-env NODE_ENV=${NODE_ENV} ${WEBPACK_BIN} --config ../webpack/webpack.config.js --progress --profile --colors`);
    exec(`node ./build_dt_works.js`);
}
