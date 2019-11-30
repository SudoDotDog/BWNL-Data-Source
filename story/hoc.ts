/**
 * @author WMXPY
 * @namespace Story
 * @description Hoc
 */

import { withDataSource } from "../src/with";
import { DataConsumer } from "./mock/consumer";

export const Provided = withDataSource(DataConsumer, {
    // tslint:disable-next-line: no-magic-numbers
    first: () => new Promise((resolve) => setTimeout(() => resolve('First Result'), 1000)),
    second: () => new Promise((resolve) => resolve('Second Result')),
    relative: (props) => new Promise((resolve) => resolve(props.relative)),
});
