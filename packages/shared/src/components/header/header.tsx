import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export interface HeaderProps {
    children?: any;
}

export class Header extends React.Component<HeaderProps> {
    render() {
        const { children } = this.props;

        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        
                        <Button variant="outlined" color="primary">
                            Primary again and again
                        </Button>
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}
