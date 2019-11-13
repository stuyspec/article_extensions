import * as React from 'react';

import { LineChartExtension } from './charts/LineChartExtension';
import { BarChartExtension } from './charts/BarChartExtension';
import { PieChartExtension } from './charts/PieChartExtension';

import { MediaExtension } from './media/MediaExtension';

//The props are parsed from the json-encoded props field in an article-extension.
export interface IExtensionProps {
    props: any,
    media?: any[]
}

export const extensions: Map<string, React.ComponentType<IExtensionProps>> = new Map([
    ["LineChartExtension", LineChartExtension],
    ["BarChartExtension", BarChartExtension],
    ["PieChartExtension", PieChartExtension],
    ["MediaExtension", MediaExtension],
]);