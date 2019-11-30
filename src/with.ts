/**
 * @author WMXPY
 * @namespace Source
 * @description With
 */

import * as React from "react";
import { CommonDataProviderProps, FetchDataFunction } from "./common";
import { SingletonDataProvider, SingletonDataProviderProps } from "./singleton";

export const withDataSource = <P extends any>(
    component: React.ComponentType<P>,
    sources: Record<string, FetchDataFunction<SingletonDataProviderProps & Record<string, any>>>,
    fallbacks?: CommonDataProviderProps,
): React.ComponentType<P> => {

    return (props: P) => {

        const node: React.ReactNode = React.createElement(component);

        return React.createElement(SingletonDataProvider, {
            ...props,
            ...fallbacks,
            sources,
        } as SingletonDataProviderProps, node);
    };
};
