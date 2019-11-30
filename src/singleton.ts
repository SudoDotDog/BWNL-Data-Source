/**
 * @author WMXPY
 * @namespace Source
 * @description Singleton
 */

import * as React from "react";
import { CommonDataProviderProps } from "./common";

export type SingletonDataProviderStates = {

    readonly data: Record<string, any>;
    readonly error: Error | null;
};

export class SingletonDataProvider extends React.Component<CommonDataProviderProps, SingletonDataProviderStates> {

    public readonly state: SingletonDataProviderStates = {

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

            const children: React.ReactElement = React.Children.only(this.props.children) as React.ReactElement;
            return React.cloneElement(children, {
                ...this._calculateProps(),
                data: this.state.data,
            });
        }
        return null;
    }

    private _calculateProps() {

        const propKeys: Array<keyof CommonDataProviderProps | string> = [
            'children',
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
