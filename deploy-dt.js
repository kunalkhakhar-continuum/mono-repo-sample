const deployProps = require('./deploy-utils.js')
deployProps.setEnv('dt');
const deployPackages = require('./deploy-packages.js');
deployPackages.deploy();