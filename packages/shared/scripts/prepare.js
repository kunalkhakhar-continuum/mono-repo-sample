const path = require('path');
const random = require('../../../random.js');
var exec = random.exec;
const env = random.NODE_ENV;
const WEBPACK_BIN = path.join(exec('npm bin'), 'webpack');
console.log(`WEBPACK_BIN: ${WEBPACK_BIN}`);
// cross-env NODE_ENV=dt webpack --config webpack/webpack.rmm-its-portal.app.config.js --progress --profile --colors
exec(`cross-env NODE_ENV=${env} ${WEBPACK_BIN} --config ../webpack/webpack.config.js --progress --profile --colors`);
