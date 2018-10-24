const deployProps = require('./deploy-props')
deployProps.setEnv('production');
const deployPackages = require('./deploy-packages.js');
deployPackages.deploy();