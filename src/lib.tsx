import { h, render } from 'preact';

import App from './components/app';
import { EventEmitter } from 'events';
import { setVisible } from './utils/dom';

import { Config } from './types'
import defaultConfig from './config/defaultConfig';

let config: Config;
const ee = new EventEmitter();
export const configure = (conf: Config) => {
    config = { ...defaultConfig, ...conf };
    const container = document.createElement('div');
    container.className =  'az-social-icon';
    // container.style.display = 'none';
    // const shadowRoot = container.attachShadow({ mode: 'open' });
    document.body.appendChild(container);
    // const previousInstance = document.querySelector('.az-social-icon' ) as HTMLElement;
    // console.log("PPPPPPP ", previousInstance)
    // if (previousInstance && previousInstance.shadowRoot) {
    //     render(h(App, { ...config, ee }), previousInstance);
    //     return;
    // }
    
    render(h(App, { ...config, ee }), container);
    
}

export const init = configure;

export const show = () => {

    if (!config) init(defaultConfig);

    return setVisible(true);
};

export const hide = () => {
    if (!config) init(defaultConfig);
    return setVisible(false);
};
