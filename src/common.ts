/**
 * @author WMXPY
 * @namespace Source
 * @description Common
 */

import * as React from "react";

export type LoadingComponent = React.ComponentType<any>;

export type CommonDataProviderProps = {

    loadingComponent?: LoadingComponent;
    loading?: React.ReactNode;
};

export type FetchDataFunction<P extends any = any> = (props: P) => Promise<void>;
