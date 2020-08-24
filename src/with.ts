/* eslint-disable @typescript-eslint/ban-types */
/**
 * @author WMXPY
 * @namespace Source
 * @description With
 */

import * as React from "react";
import { CommonDataProviderFallbackProps, CommonDataProviderProps, FetchDataFunction } from "./common";
import { SingletonDataProvider } from "./singleton";

export const withDataSource = <P extends any = {}>(
    component: React.FunctionComponent<P & {}> | React.ComponentClass<P & {}, any>,
    sources: Record<string, FetchDataFunction<CommonDataProviderProps & Record<string, any>>>,
    fallbacks?: CommonDataProviderFallbackProps,
): React.ComponentType<P> => {

    return (props: P) => {

        const node: React.ReactNode = React.createElement(component);

        return React.createElement(SingletonDataProvider, {
            ...props as any,
            ...fallbacks,
            sources,
        } as CommonDataProviderProps, node);
    };
};
