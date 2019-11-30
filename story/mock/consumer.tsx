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

    public public() {

        return (<div>
            Info: {this.props.data.info}
        </div>);
    }
}
