/**
 * @author WMXPY
 * @namespace Story
 * @description Consumer
 */

import * as React from "react";

export type DataConsumerProps = {

    readonly data: Record<string, any>;
};

export class DataConsumer extends React.Component<DataConsumerProps> {

    public render() {

        return (<div>
            <div>First: {this.props.data.first}</div>
            <div>Second: {this.props.data.second}</div>
            <div>Relative: {this.props.data.relative}</div>
        </div>);
    }
}
