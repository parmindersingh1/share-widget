import { Fragment, Component, h } from 'preact';
import { EventEmitter } from 'events';
import { Config } from '../types';
import './app.module.scss';
import {NewsLetterPopUpComponent} from './NewsLetter-PopUp-component';
import '../style/Index-tailwind.css'
import './Style.css'
import {cookieName} from '../constants/cookie-name.constant';
import {getCookie, setCookie} from '../services/cookies.service';

interface AppProps extends Config {
    containerClassName: string,
    ee?: EventEmitter;
}

// Types for state
type ExpandableState = {
    containerClassName?: string,
    configuration?: any,
    toggled: boolean,
};


class App extends Component<any, ExpandableState> {
    constructor(props: any) {
        super(props);
        let configurationRefactor = {
                Validation: {}
        }
        props.Configuration.Form.Validation.map(item => {
            configurationRefactor.Validation[item.key] = {
                display: item.display,
                required: item.required,
                minLength: item.minLength,
                maxLength: item.maxLength,
            }
        })
        props.Configuration.Form = configurationRefactor
        this.state = {
            configuration: props,
            toggled: true,
        }
    }

    componentDidMount() {
        const cookieConsent = getCookie(cookieName.AzConsentPreference);
        if (cookieConsent) {
           const consent = JSON.parse(cookieConsent);
           const consentEdited = {...consent}
            consentEdited.pageViews ++
            setCookie(cookieName.AzConsentPreference, JSON.stringify(consentEdited))
        } else {
            const initCookie = JSON.stringify({
                consentVersion: 1,
                pageViews: 1
            })
            setCookie(cookieName.AzConsentPreference, initCookie)
        }
    }

    render() {
        return (
            <Fragment>
                {!this.state.configuration.Configuration.BasicConfig?.MutePopup ?
                <div class="font-sans">
                    <NewsLetterPopUpComponent configurationData={this.state.configuration} />
                </div> : null}
            </Fragment>
            )
                
        }

}


export default App;
