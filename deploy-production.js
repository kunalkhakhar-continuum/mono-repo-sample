const deployProps = require('./deploy-utils.js')
const setEnv = deployProps.setEnv;
setEnv('production');
const deployPackages = require('./deploy-packages.js');
deployPackages().deploy();