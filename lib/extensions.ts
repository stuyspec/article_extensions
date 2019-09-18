import * as React from 'react';

import { LineChartExtension } from './LineChartExtension';
import { BarChartExtension } from './BarChartExtension';
import { PieChartExtension } from './PieChartExtension'

//The props are parsed from the json-encoded props field in an article-extension.
export interface IExtensionProps {
    props: any,
}

export const extensions: Array<[string, React.ComponentType<IExtensionProps>]> = [
    ["LineChartExtension", LineChartExtension],
    ["BarChartExtension", BarChartExtension],
    ["PieChartExtension", PieChartExtension]
];