/**
 * @author WMXPY
 * @namespace Source
 * @description Util
 */

import * as React from "react";
import { CommonDataProviderFallbackProps } from "./common";

export const renderLoadingPart = (props: CommonDataProviderFallbackProps): React.ReactNode => {

    if (props.loading) {

        return props.loading;
    }
    if (props.loadingComponent) {

        return React.createElement(props.loadingComponent);
    }
    return null;
};
