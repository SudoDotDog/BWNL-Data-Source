/**
 * @author WMXPY
 * @namespace Story
 * @description Hoc
 */

import { withDataSource } from "../src/with";
import { DataConsumer } from "./mock/consumer";

export const Provided = withDataSource(DataConsumer, {
    first: () => new Promise((resolve) => resolve('First Result')),
    second: () => new Promise((resolve) => resolve('Second Result')),
});
