import * as React from 'react';
import { Header } from 'shared';

export class HomePage extends React.Component<{}, {}> {
    public render() {
        const styles = {
            content: {
                padding: 16
            }
        };

        return (
            <div>
                <Header>Home try --skip-npm</Header>
                <Header>Home try --skip-git</Header>
                <div style={styles.content}>Hello World!</div>
            </div>
        );
    }
}
