import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { configure } from 'mobx';
import { App } from './app';

// check for process.node.env
// check for manual increment from git
// check build for remaining packages
configure({ enforceActions: true });

ReactDOM.render(<App />, document.getElementById('root'));
