const deployProps = require('./deploy-utils.js')
const setEnv = deployProps.setEnv;
setEnv('dt');
const deployPackages = require('./deploy-packages.js');
deployPackages().deploy();