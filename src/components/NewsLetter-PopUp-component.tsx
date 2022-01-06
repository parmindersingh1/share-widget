import {h, Component, Fragment} from 'preact';
import SubscriptionFormComponent from './Subscription-form.component';

export class NewsLetterPopUpComponent extends Component<any, any> {
    state = {
        consent: '',
        changeLang: ''
    }
    componentDidMount() {
        this.hideNewsletter();
    }

    getCookie(cookieName: any) {
        const name = cookieName + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }
    hideNewsletter = () =>{
        const consent = this.getCookie('az-newsletter');
        this.setState({
            consent
        });
    }
    onOptOut = () => {
        this.setCookie('az-newsletter', 'Opt-out')
        this.hideNewsletter();
    }
    setCookie(cookieName, cookieValue) {
        const date = new Date();
        date.setTime(
            date.getTime() + 365 * 24 * 60 * 60 * 1000
        );
        const expires = 'expires=' + date.toUTCString();
        // const secstr = ";secure";
        document.cookie =
            cookieName +
            '=' +
            cookieValue +
            ';' +
            expires +
            ';' +
            'host=' +
            ';path=/';
        // + ";SameSite=Lax" + secstr;
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
    render() {
        const config = this.props.configurationData.Configuration;
        const {consent, changeLang} = this.state;
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
        console.log('content', languageList)
        return (
            <Fragment>
                {!consent ?
                <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
                     aria-modal="true">
                    <div style={{float: config.BasicConfig?.BoxedType === 'top-right'  ? 'right' : null}}
                        className={
                       config.BasicConfig?.BoxedType === 'center' ? `flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ` : null
                    }>
                        <div style={{marginTop: config.BasicConfig?.BoxedType !== 'center' ? '0px' : null,
                            position: config.BasicConfig?.BoxedType !== 'bottom-left' || config.BasicConfig?.BoxedType !== 'bottom-right' ? 'fixed' : null,
                            bottom: config.BasicConfig?.BoxedType !== 'bottom-left' || config.BasicConfig?.BoxedType !== 'bottom-right' ? '0px' : null,
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
                                    <svg style={{color: config.Layout?.HeaderTextColor}} xmlns="http://www.w3.org/2000/svg"
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
                            <div style={{backgroundColor: config.Layout?.BodyBackgroundColor, borderTop: `3px solid ${config.Layout?.BodyTextColor}`}}
                                 class="bg-red-200 px-4 py-5">
                                <SubscriptionFormComponent hideNewsletter={this.hideNewsletter} content={content} configurationData={this.props.configurationData}/>
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
