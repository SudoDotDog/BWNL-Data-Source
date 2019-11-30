/**
 * @author WMXPY
 * @namespace Source
 * @description Function
 */

import * as React from "react";
import { CommonDataProviderProps } from "./common";
import { calculateExtraProps, matchSourceData, renderLoadingPart } from "./util";

export type FunctionDataProviderProps = {

    readonly children: (props: Record<string, any>) => React.ReactNode;
} & CommonDataProviderProps;

export type FunctionDataProviderStates = {

    readonly data: Record<string, any>;
    readonly error: Error | null;
};

export class FunctionDataProvider extends React.Component<FunctionDataProviderProps, FunctionDataProviderStates> {

    public readonly state: FunctionDataProviderStates = {

        data: {},
        error: null,
    };

    public componentDidMount() {

        const sourceKeys: string[] = Object.keys(this.props.sources);
        for (const key of sourceKeys) {

            if (typeof this.props.sources[key] === 'function') {

                Promise.resolve(this.props.sources[key](this.props))
                    .then((result: any) => this.setState({
                        data: {
                            ...this.state.data,
                            [key]: result,
                        },
                    }))
                    .catch((reason: any) => this.setState({
                        error: reason,
                    }));
            }
        }
    }

    public render() {

        if (matchSourceData(this.props.sources, this.state.data)) {

            return this._renderChildren();
        }
        return renderLoadingPart(this.props);
    }

    private _renderChildren() {

        if (this.props.children) {

            return this.props.children({
                ...calculateExtraProps(this.props),
                data: this.state.data,
            });
        }
        return null;
    }
}
