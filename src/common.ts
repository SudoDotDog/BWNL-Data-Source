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
