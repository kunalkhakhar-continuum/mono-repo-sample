import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { configure } from 'mobx';
import { App } from './app';

// check for process.node.env
configure({ enforceActions: true });

ReactDOM.render(<App />, document.getElementById('root'));
