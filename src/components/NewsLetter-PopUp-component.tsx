import {h, Component, Fragment} from 'preact';
import SubscriptionFormComponent from './Subscription-form.component';
import {getCookie, setCookie} from '../services/cookies.service';
import {cookieName, optStatus} from '../constants/cookie-name.constant';

export class NewsLetterPopUpComponent extends Component<any, any> {
    state = {
        show: true,
        changeLang: ''
    }
    componentDidMount() {
        this.checkNewsletterStatus();
        this.onShowBannerFrequency();
    }


    checkNewsletterStatus = () =>{
        const cookieConsent = getCookie(cookieName.AzConsentPreference);
        if (cookieConsent) {
            const consent = JSON.parse(cookieConsent);
            if (consent.hasOwnProperty('status')) {
                this.setState({
                    show: !consent?.status
                })
            }
        }
    }
    onOptOut = (e) => {
        const cookieConsent = getCookie(cookieName.AzConsentPreference);
        const consent = JSON.parse(cookieConsent);
        const consentEdited = {...consent}
        consentEdited.status = e === optStatus.optIn ? optStatus.optIn : optStatus.optOut
        setCookie(cookieName.AzConsentPreference, JSON.stringify(consentEdited))
        this.checkNewsletterStatus()
    }

    onFindAllowedLang(browserLang): boolean {
        let status = false;
        for (const lang of this.props.configurationData.Configuration.LanguagesConfig.AllowedLang) {
            if (lang.code === browserLang) {
                status = true
            }
        }
        return status
    }
    onChangeLang(e) {
        this.setState({
            changeLang: e.target.value
        })
    }
    onShowPopUp() {
        this.setState({
            show: true
        })
    }
    onShowBannerFrequency() {
        const cookieConsent = getCookie(cookieName.AzConsentPreference);
        if (cookieConsent) {
            const decodeConsent = JSON.parse(cookieConsent);
            const displayFrequency: any = this.props.configurationData.Configuration.DisplayFrequency;
            const {hours, days, pageViews} = this.onGetTimeDif(decodeConsent);
            if (decodeConsent?.status === optStatus.optOut) {
                if (
                    displayFrequency.DisplayClosedConsentType === 'hours' &&
                    hours >= displayFrequency.DisplayClosedConsent
                ) {
                    this.onShowPopUp();
                } else if (
                    displayFrequency.DisplayClosedConsentType === 'days' &&
                    days >= displayFrequency.DisplayClosedConsent
                ) {
                    this.onShowPopUp();
                } else if (
                    displayFrequency.DisplayClosedConsentType === 'pageViews' &&
                    pageViews >= displayFrequency.DisplayClosedConsent
                ) {
                    this.onShowPopUp();
                }
            }
        }
    }
    onGetTimeDif(decodeConsent) {
        // @ts-ignore
        const deff = new Date() - new Date(decodeConsent?.lastInteraction);
        const milliseconds = Math.abs(deff);
        const hours = Math.floor(milliseconds / 36e5);
        const days = Math.floor(milliseconds / (1000 * 3600 * 24));
        return { hours, days, pageViews: decodeConsent?.pageViews };
    }

    render() {
        const config = this.props.configurationData.Configuration;
        const {show, changeLang} = this.state;
        const browserLang = window.navigator?.language?.replace('-','')
        let content = null;
        let currentLang = null;
        if (changeLang) {
            currentLang = changeLang;
            content = this.props.configurationData.Configuration?.LanguagesConfig?.LanguageData[changeLang];
        } else if(this.onFindAllowedLang(browserLang)) {
            currentLang = browserLang;
            content = this.props.configurationData.Configuration?.LanguagesConfig?.LanguageData[browserLang];
        } else {
            const defaultLanguage = this.props.configurationData.Configuration?.LanguagesConfig?.DefaultLanguage ? this.props.configurationData.Configuration?.LanguagesConfig?.DefaultLanguage : this.props.configurationData.Configuration.LanguagesConfig.AllowedLang[0]?.code
            currentLang = defaultLanguage;
            content = this.props.configurationData.Configuration?.LanguagesConfig?.LanguageData[defaultLanguage];
        }
        const languageList = this.props.configurationData.Configuration.LanguagesConfig.AllowedLang;
        return (
            <Fragment>
                {show ?
                <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
                     aria-modal="true">
                    <div style={{float: config.BasicConfig?.BoxedType === 'top-right'  ? 'right' : null}}
                        className={
                       config.BasicConfig?.BoxedType === 'center' ? `flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ` : null
                    }>
                        <div style={{marginTop: config.BasicConfig?.BoxedType !== 'center' ? '0px' : '5em',
                            position: (config.BasicConfig?.BoxedType !== 'bottom-left' || config.BasicConfig?.BoxedType !== 'bottom-right') && config.BasicConfig?.BoxedType !== 'center' ? 'fixed' : null,
                            bottom: (config.BasicConfig?.BoxedType === 'bottom-left' || config.BasicConfig?.BoxedType === 'bottom-right') && config.BasicConfig?.BoxedType !== 'center' ? '0px' : null,
                            top: (config.BasicConfig?.BoxedType === 'top-left' || config.BasicConfig?.BoxedType === 'top-right') && config.BasicConfig?.BoxedType !== 'center' ? '10px' : null,
                            right: (config.BasicConfig?.BoxedType === 'top-right' || config.BasicConfig?.BoxedType === 'bottom-right') && config.BasicConfig?.BoxedType !== 'center' ? '10px' : null,
                        }}
                            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div style={{backgroundColor: config.Layout?.HeaderBackgroundColor}}
                                 class={`bg-white  pt-1 pb-4 sm:pt-1 sm:pl-1 sm:pr-1 sm:p-6 sm:pb-4`}>
                                <div class="w-20 float-left  sm:col-span-4">
                                    <select id="country" name="country" onChange={($event) => this.onChangeLang($event)} autocomplete="country-name" style={{fontSize: '12px'}} class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        {languageList.map(item =>
                                            <option selected={item.code === currentLang} value={item.code}>{item.title}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="float-right cursor-pointer" onClick={this.onOptOut}>
                                    <svg style={{color: config.Layout?.HeaderTextColor, height: '1.5rem', width: '1.5rem'}} xmlns="http://www.w3.org/2000/svg"
                                         class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </div>
                                <div class="">

                                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <div class="mt-2">
                                            {config.Branding?.CompanyLogo ?
                                                <div class="logo-img text-center">
                                                    <img class="object-cover h-10 " src={config.Branding?.CompanyLogo}/>
                                                </div> : null}
                                            <div className="content text-center">
                                                <h1 style={{color: config.Layout?.HeaderTextColor}}
                                                    class="text-3xl leading-6 font-medium  text-gray-900"
                                                    id="modal-title">
                                                    {content?.title}
                                                </h1>
                                                <p style={{color: config.Layout?.HeaderTextColor}}>{content?.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{backgroundColor: config.Layout?.BodyBackgroundColor, borderTop: `3px solid ${config.Layout?.BodyTextColor}`, paddingBottom: '2.25rem'}}
                                 class="bg-red-200 px-4 py-5">
                                <SubscriptionFormComponent hideNewsletter={this.onOptOut} content={content} configurationData={this.props.configurationData}/>
                                {config.BasicConfig.WaterMark ?
                                <div className={'float-right sm:m-0'}>
                                    <p className={'sm:m-0'}>
                                <span style="color: gray;font-size: 12px">{content?.poweredByText} : </span><a href="https://adzapier.com/" target="_blank"
                                                       style="color: gray">Adzapier</a></p>
                                </div> : null }
                            </div>
                        </div>
                    </div>
                </div> : null}
            </Fragment>
        )
    }
}
