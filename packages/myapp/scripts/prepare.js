const path = require('path');
const getEnv = require('../../../deploy-utils.js').getEnv;
const NODE_ENV = getEnv();
const exec = require('../../../deploy-utils.js').exec;
console.log(`current env in prepare:: ${NODE_ENV}`)
const WEBPACK_BIN = path.join(exec('npm bin'), 'webpack');
console.log(`WEBPACK_BIN: ${WEBPACK_BIN}`);
//  cross-env NODE_ENV=dt webpack --config webpack/webpack.rmm-its-portal.app.config.js --progress --profile --colors 
// exec(`cross-env NODE_ENV=${NODE_ENV} ${WEBPACK_BIN} --config ../webpack/webpack.config.js --progress --profile --colors`);
exec(`node ./build_dt_works.js`);
