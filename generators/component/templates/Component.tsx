import * as React from 'react';
import { observer } from 'mobx-react';

const styles = require('./<%= componentName %>.scss');

export interface <%= componentName %>Props {
}

@observer
export default class <%= componentName %> extends React.Component<<%= componentName %>Props, {}> {
    render() {
        return (
            <span><%= componentName %> component</span>
        );
    }
}