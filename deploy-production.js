const deployProps = require('./deploy-utils.js')
deployProps.setEnv('production');
const deployPackages = require('./deploy-packages.js');
deployPackages().deploy();