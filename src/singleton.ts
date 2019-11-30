/**
 * @author WMXPY
 * @namespace Source
 * @description Singleton
 */

import * as React from "react";
import { CommonDataProviderProps } from "./common";

export type SingletonDataProviderProps = {

    readonly sources: Record<string, any>;
    readonly childrenProps?: any;
} & CommonDataProviderProps;

export type SingletonDataProviderStates = {

    readonly data: Record<string, any>;
};

export class SingletonDataProvider extends React.Component<SingletonDataProviderProps> {

    public readonly state: SingletonDataProviderStates = {

        data: {},
    };

    constructor(props: SingletonDataProviderProps) {

        super(props);
    }

    public render() {

        if (this.props.children) {

            const children: React.ReactElement = React.Children.only(this.props.children) as React.ReactElement;
            return React.cloneElement(children, {
                ...this.props.childrenProps,
                data: this.state.data,
            });
        }

        return
    }

    private _renderLoading() {

        if (this.props.loadingComponent) {


        }
    }
}
