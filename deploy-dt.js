const deployProps = require('./deploy-props')
deployProps.setEnv('dt');
const deployPackages = require('./deploy-packages.js');
deployPackages.deploy();