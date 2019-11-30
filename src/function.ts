/**
 * @author WMXPY
 * @namespace Source
 * @description Function
 */

import * as React from "react";
import { CommonDataProviderProps, FetchDataFunction } from "./common";

export type FunctionDataProviderOriginalProps = {

    readonly sources: Record<string, FetchDataFunction<FunctionDataProviderProps & Record<string, any>>>;
};

export type FunctionDataProviderProps = {

    readonly children: (props: Record<string, any>) => React.ReactNode;
} & FunctionDataProviderOriginalProps & CommonDataProviderProps & Record<string, any>;

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

        if (this._matchData()) {

            return this._renderChildren();
        }
        return this._renderLoading();
    }

    private _renderChildren() {

        if (this.props.children) {

            return this.props.children({
                ...this._calculateProps(),
                data: this.state.data,
            });
        }
        return null;
    }

    private _calculateProps() {

        const propKeys: Array<keyof (FunctionDataProviderOriginalProps & CommonDataProviderProps)> = [
            'sources',
            'loadingComponent',
            'loading',
            'fallbackComponent',
            'fallback',
        ];

        return Object.keys(this.props).reduce((previous: Record<string, any>, current: string) => {

            if (propKeys.includes(current as any)) {
                return previous;
            }
            return {
                ...previous,
                [current]: this.props[current],
            };
        }, {} as Record<string, any>);
    }

    private _renderLoading() {

        if (this.props.loading) {

            return this.props.loading;
        }
        if (this.props.loadingComponent) {

            return React.createElement(this.props.loadingComponent);
        }
        return null;
    }

    private _matchData(): boolean {

        const sourceKeys: string[] = Object.keys(this.props.sources);
        const dataKeys: string[] = Object.keys(this.state.data);

        return sourceKeys.length === dataKeys.length;
    }
}
