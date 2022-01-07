import { h, render } from 'preact';

import App from './components/app';
import { EventEmitter } from 'events';
import { setVisible } from './utils/dom';

import { Config } from './types'
import defaultConfig from './config/defaultConfig';
import {containerModalClassName} from './const';



let containerClassName = containerModalClassName
let config: Config;
const ee = new EventEmitter();
export const configure = (conf: Config) => {
    config = { ...defaultConfig, ...conf };
    const container = document.createElement('aside');
    container.className =  'az-social';
    // container.style.display = 'none';
    const shadowRoot = container.attachShadow({ mode: 'open' });
    // let css: HTMLStyleElement | HTMLLinkElement;
    let css2: HTMLStyleElement | HTMLLinkElement;
    if (process.env.NODE_ENV === 'development') {
        css2 = document.createElement('link');
        css2.setAttribute('rel', 'stylesheet');
        css2.setAttribute('href', 'https://staging-cdn.adzapsrv.com/consent-preference/newsletter-bundle/develop/az-consent-preference-style.css');
    } else {
        css2 = document.createElement('link');
        css2.setAttribute('rel', 'stylesheet');
        css2.setAttribute('href', 'https://staging-cdn.adzapsrv.com/consent-preference/newsletter-bundle/develop/az-consent-preference-style.css');
    }
    shadowRoot.appendChild(css2);

    const previousInstance = document.querySelector('.az-social' ) as HTMLElement;
    if (previousInstance && previousInstance.shadowRoot) {
        render(h(App, { ...config, ee,containerClassName }), previousInstance.shadowRoot);
        return;
    }


    document.body.prepend(container);
    if (config.type.toLocaleLowerCase() == "modal") {
        container.addEventListener('click', (event) => {
            setVisible(false);
        });
    }

    let appConfig = { ...config, ee,containerClassName };

    render(h(App, appConfig), shadowRoot);
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
