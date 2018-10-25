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
                <Header>try deploy scripts</Header>
                <Header>try --skip-npm</Header>
                <Header>try --skip-git</Header>
                <Header>try lerna publish with pre-release</Header>
                <Header>try lerna publish test the version bump after pre-release</Header>
                <Header>try lerna version command</Header>
                <Header>check remaining packges build</Header>
                <div style={styles.content}>Hello World!</div>
                <div style={styles.content}>Hello World! again</div>
            </div>
        );
    }
}
