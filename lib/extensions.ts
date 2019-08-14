import * as React from 'react';

import { LineChartExtension } from './LineChartExtension';

//The props are parsed from the json-encoded props field in an article-extension.
export interface IExtensionProps {
    props: any,
}

export const extensions: Map<string, React.ComponentType<IExtensionProps>> = new Map([
    ["LineChartExtension", LineChartExtension]
]);