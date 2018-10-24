import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { configure } from 'mobx';
import { App } from './app';

// Enable strict mode for MobX. This disallows state changes outside of an action check patch
configure({ enforceActions: true });

ReactDOM.render(<App />, document.getElementById('root'));
