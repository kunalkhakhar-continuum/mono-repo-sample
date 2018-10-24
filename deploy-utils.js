let NODE_ENV = 'production';

const execSync = require('child_process').execSync;
const log = (message) => {
    console.log('*******BEGIN**********');
    console.log(message);
    console.log('*******END**********');
};

const exec = (command) => execSync(command, { encoding: 'utf8' }).trim();

const setEnv = (env) => {
    NODE_ENV = env;
}

const getEnv = () => {
    return NODE_ENV;
}

module.exports = {
    exec,
    log,
    getEnv,
    setEnv
}
