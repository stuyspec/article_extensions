import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { extensions, IExtensionProps } from './extensions';

export interface IExtensionProps {
    props: any,
}

const ExtensionHelper: React.FunctionComponent<IProps> = ({type, props, additionalExtensions, ...rest}) => {
    let propsObj;
    try {
        propsObj = JSON.parse(props);
    }
    catch(e) {
        console.error(`Unable to parse props "${props}" in article extension of type ${type} (in Extension).`)
        return null;
    }
    const allExtensions = additionalExtensions ? new Map([...extensions, ...additionalExtensions]) : extensions
    const SelectedExtension = allExtensions.get(type);
    if (SelectedExtension) {
        return <SelectedExtension props={propsObj} {...rest} />
    }
    else {
        console.error(`No article extension available for type ${type} (in Extension).`)
        return null;
    }
}

type IProps<T> =  {
    type: string,
    props: string,
    additionalExtensions?: Map<string, React.ComponentType<IExtensionProps & T>>,
    root: Element,
} & T;

export function Extension<T = {}>({root, ...rest}: IProps<T>)  {
    return ReactDOM.createPortal(<ExtensionHelper {...rest} />, root);
}