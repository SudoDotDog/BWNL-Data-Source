/**
 * @author WMXPY
 * @namespace Source
 * @description Util
 */

import * as React from "react";
import { CommonDataProviderFallbackProps, CommonDataProviderProps } from "./common";

export const renderLoadingPart = (props: CommonDataProviderFallbackProps): React.ReactNode => {

    if (props.loading) {

        return props.loading;
    }
    if (props.loadingComponent) {

        return React.createElement(props.loadingComponent);
    }
    return null;
};

export const calculateExtraProps = (props: CommonDataProviderProps & Record<string, any>): Record<string, any> => {

    const propKeys: Array<keyof CommonDataProviderProps | string> = [
        'children',
        'sources',
        'loadingComponent',
        'loading',
        'fallbackComponent',
        'fallback',
    ];

    return Object.keys(props).reduce((previous: Record<string, any>, current: string) => {

        if (propKeys.includes(current as any)) {
            return previous;
        }
        return {
            ...previous,
            [current]: props[current],
        };
    }, {} as Record<string, any>);
};
