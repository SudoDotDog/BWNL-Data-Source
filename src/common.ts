/**
 * @author WMXPY
 * @namespace Source
 * @description Common
 */

import * as React from "react";

export type FallbackComponentProps = {

    readonly error: Error;
};

export type LoadingComponent = React.ComponentType<any>;
export type FallbackComponent = React.ComponentType<FallbackComponentProps>;

export type CommonDataProviderProps = {

    readonly loadingComponent?: LoadingComponent;
    readonly loading?: React.ReactNode;

    readonly fallbackComponent?: FallbackComponent;
    readonly fallback?: React.ReactNode;
};

export type FetchDataFunction<P extends any = any> = (props: P) => Promise<void>;
