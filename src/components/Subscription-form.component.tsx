import {Component, createRef, Fragment, h} from 'preact';
import {useState, useCallback} from 'preact/hooks'
import {findDOMNode} from 'preact/compat';
import {getCookie, setCookie} from '../services/cookies.service';
import {cookieName,  optStatus} from '../constants/cookie-name.constant';

export default class SubscriptionFormComponent extends Component<any, any> {
    constructor() {
        super();
    }

    state = {
        formData: {
            first_Name: '',
            last_Name: '',
            city: '',
            country: '',
            zip_Code: '',
            email: ''
        },
        errors: {
            first_Name: {
                error: false,
                message: ''
            },
            last_Name: {
                error: false,
                message: ''
            },
            city: {
                error: false,
                message: ''
            },
            country: {
                error: false,
                message: ''
            },
            zip_Code: {
                error: false,
                message: ''
            },
            email: {
                error: false,
                message: ''
            },
            privacyPolicy: {
                error: false,
                message: ''
            }
        },
        submitted: false
    }
    componentDidMount() {
        const validationConfig = this.props.configurationData.Configuration.Form.Validation;
        this.setState({
            errors: {
                first_Name: {
                    error: validationConfig.first_Name?.required && validationConfig.first_Name?.display,
                    message: 'This Field is required'
                },
                last_Name: {
                    error: validationConfig.last_Name?.required && validationConfig.last_Name?.display,
                    message: 'This Field is required'
                },
                city: {
                    error: validationConfig.city?.required && validationConfig.city?.display,
                    message: 'This Field is required'
                },
                country: {
                    error: validationConfig.country?.required && validationConfig.country?.display,
                    message: 'This Field is required'
                },
                zip_Code: {
                    error: validationConfig.zip_Code?.required && validationConfig.zip_Code?.display,
                    message: 'This Field is required'
                },
                email: {
                    error: validationConfig.email?.required && validationConfig.email?.display,
                    message: 'This Field is required'
                },
                privacyPolicy: {
                    error: validationConfig.privacy_Policy?.required && validationConfig.privacy_Policy?.display,
                    message: 'This Field is required'
                }
            }
        })
    }

    validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    handleChange = (e, field) => {
        const values: any = {...this.state.formData};
        const errors: any = {...this.state.errors};
        const config: any = this.props.configurationData.Configuration.Form.Validation;
        if (field === 'first_Name' && config.first_Name?.display) {
            const first_Name = e.target.value
            if (first_Name.trim() === '' && config.first_Name?.required) {
                errors.first_Name.error = true;
                errors.first_Name.message = 'This field is required'
            } else if (first_Name.length < config.first_Name?.minLength || first_Name.length > config.first_Name?.maxLength) {
                errors.first_Name.error = true;
                errors.first_Name.message = `Required, Minimum length ${config.first_Name?.minLength}, Maximum length ${config.first_Name?.maxLength}`
            } else {
                errors.first_Name.error = false;
                errors.first_Name.message = '';
                values.first_Name = first_Name;
            }
        } else if (field === 'last_Name' && config.last_Name?.display) {
            const last_Name = e.target.value
            if (last_Name.trim() === ''  && config.last_Name?.required) {
                errors.last_Name.error = true;
                errors.last_Name.message = 'This field is required'
            } else if (last_Name.length < config.last_Name?.minLength || last_Name.length > config.last_Name?.maxLength) {
                errors.last_Name.error = true;
                errors.last_Name.message = `Required, Minimum length ${config.last_Name?.minLength}, Maximum length ${config.last_Name?.maxLength}`
            } else {
                errors.last_Name.error = false;
                errors.last_Name.message = '';
                values.last_Name = last_Name;
            }
        } else if (field === 'city' && config.city?.display) {
            const city = e.target.value
            if (city.trim() === ''  && config.city?.required) {
                errors.city.error = true;
                errors.city.message = 'This field is required'
            } else if (city.length < config.city?.minLength || city.length > config.city?.maxLength) {
                errors.city.error = true;
                errors.city.message = `Required, Minimum length ${config.city?.minLength}, Maximum length ${config.city?.maxLength}`
            } else {
                errors.city.error = false;
                errors.city.message = '';
                values.city = city;
            }
        } else if (field === 'country' && config.country?.display) {
            const country = e.target.value
            if (country.trim() === ''  && config.country?.required) {
                errors.country.error = true;
                errors.country.message = 'This field is required'
            } else if (country.length < config.country?.minLength || country.length > config.country?.maxLength) {
                errors.country.error = true;
                errors.country.message = `Required, Minimum length ${config.country?.minLength}, Maximum length ${config.country?.maxLength}`
            } else {
                errors.country.error = false;
                errors.country.message = '';
                values.country = country;
            }
        } else if (field === 'zip_Code' && config.zip_Code?.display) {
            const zip_Code = e.target.value
            if (zip_Code.trim() === ''  && config.zip_Code?.required) {
                errors.zip_Code.error = true;
                errors.zip_Code.message = 'This field is required'
            } else if (zip_Code.length < config.zip_Code?.minLength) {
                errors.zip_Code.error = true;
                errors.zip_Code.message = `Required, Minimum length ${config.zip_Code?.minLength}`
            } else {
                errors.zip_Code.error = false;
                errors.zip_Code.message = '';
                values.zip_Code = zip_Code;
            }
        } else if (field === 'email' && config.email?.display) {
            const email = e.target.value
            if (email.trim() === ''  && config.email?.required) {
                errors.email.error = true;
                errors.email.message = 'This field is required'
            } else if (this.validateEmail(email) === null) {
                errors.email.error = true;
                errors.email.message = 'Email ID is not valid'
            } else {
                errors.email.error = false;
                errors.email.message = '';
                values.email = email
            }
        }  else if (field === 'privacyPolicy' && config.privacy_Policy?.display) {
            const privacyPolicy = e.target.checked
            if (!privacyPolicy && config.privacy_Policy?.required) {
                errors.privacyPolicy.error = true;
                errors.privacyPolicy.message = 'This field is required'
            } else {
                errors.privacyPolicy.error = false;
                errors.privacyPolicy.message = '';
            }
        }
        this.setState({
            formData: values,
            errors
        })

    }
    handleSubmit = (ev) => {
        ev.preventDefault()
        this.setState({
            submitted: true
        })
        const {errors} = this.state;
        if (errors.first_Name.error || errors.last_Name.error || errors.country.error || errors.city.error || errors.zip_Code.error || errors.email.error || errors.privacyPolicy.error) {
            return false;
        }
        const cookieConsent = getCookie(cookieName.AzConsentPreference);
        if (cookieConsent) {
            const consent = JSON.parse(cookieConsent);
            const consentEdited = {...consent}
            consentEdited.consentVersion++
            consentEdited.lastInteraction = new Date()
            consentEdited.status = optStatus.optIn
            setCookie(cookieName.AzConsentPreference, JSON.stringify(consentEdited))
        }

        this.props.hideNewsletter(optStatus.optIn);
        const xhr = new XMLHttpRequest;
        const that = this;
        const config = this.props.configurationData;
        const formData = this.state.formData;
        const payloadData:any = {};
        payloadData.first_name = formData.first_Name;
        payloadData.last_name = formData.last_Name;
        payloadData.email = formData.email;
        payloadData.country = formData.country;
        // payloadData.country = formData.country;
        payloadData.verified = false;
        payloadData.data_source = 'public';
        payloadData.additional_data = {
            city: formData.city,
            zip_Code: formData.zip_Code
        }
        payloadData.preferences = [
            {preference: "terms_and_conditions", allow: true},
            {preference: "privacy_policy", allow: true},
            {preference: "newsletter", allow: true},
        ];
        payloadData.proofs = [ // Optional
            {
                content: JSON.stringify(payloadData),
                form:  JSON.stringify(ev.target.innerHTML)
            }
        ];
        const path = config.EnvConfig?.ApiBaseUrl + config.EnvConfig?.EndPoint.replace(':pid', config.PropId)
        xhr.open("POST", path);
        new Promise((resolve, reject)  =>{
            xhr.onload = function() {
                if (this.readyState === XMLHttpRequest.DONE && (this.status === 200 || this.status === 201)) {
                    resolve(true)
                }
            }
            xhr.send(JSON.stringify(payloadData));
            xhr.onerror =  (err) => {
                reject(err)
            };
        });
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
    render() {
        const {errors, submitted} = this.state;
        // console.log('this.props.configuration', this.props.configurationData)
        const config: any = this.props.configurationData.Configuration.Form.Validation;
        const layoutConfig: any = this.props.configurationData.Configuration.Layout;
        const content = this.props?.content;
        return (
            <Fragment>
            <form onSubmit={this.handleSubmit}>
                <div class=" overflow-hidden">
                    <div class="py-2 sm:p-6">
                        <div class="grid grid-cols-6">
                            {config?.first_Name?.display ?
                            <div class="col-span-6 sm:ml-3 sm:mr-3 sm:col-span-3">
                                <label for="first-name" style={{color: layoutConfig.BodyTextColor}} class="block text-sm font-medium text-gray-700">{content?.firstName} </label>
                                <input type="text" onInput={($event) => this.handleChange($event, 'first_Name')}
                                       name="first-name" id="first-name" autocomplete="given-name"
                                       class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                {errors.first_Name.error && submitted ?
                                <p style={{fontSize: '10px'}} className="text-red-600  sm:m-0 error-message">{errors.first_Name.message}</p> : null}
                            </div> : null }
                            {config?.last_Name?.display ?
                            <div class="col-span-6 sm:ml-3 sm:mr-3 sm:col-span-3">
                                <label for="last-name" style={{color: layoutConfig.BodyTextColor}} class="block text-sm font-medium text-gray-700">{content?.lastName}</label>
                                <input type="text" onInput={($event) => this.handleChange($event, 'last_Name')}
                                       name="last-name" id="last-name" autocomplete="family-name"
                                       class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                {errors.last_Name.error  && submitted ?
                                    <p style={{fontSize: '10px'}} className="text-red-600  sm:m-0 error-message">{errors.last_Name.message}</p> : null}
                            </div> : null}
                            {config?.city?.display ?
                            <div class="col-span-6 sm:ml-3 sm:mr-3 sm:col-span-3">
                                <label for="first-name" style={{color: layoutConfig.BodyTextColor}} class="block text-sm font-medium text-gray-700">{content?.city}</label>
                                <input type="text" onInput={($event) => this.handleChange($event, 'city')}
                                       name="first-name" id="first-name" autocomplete="given-name"
                                       class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                {errors.city.error  && submitted ?
                                    <p style={{fontSize: '10px'}} className="text-red-600  sm:m-0 error-message">{errors.city.message}</p> : null}
                            </div> : null}
                            {config?.country?.display ?
                            <div class="col-span-6 sm:ml-3 sm:mr-3 sm:col-span-3">
                                <label for="last-name" style={{color: layoutConfig.BodyTextColor}} class="block text-sm font-medium text-gray-700">{content?.country}</label>
                                <input type="text" onInput={($event) => this.handleChange($event, 'country')}
                                       name="last-name" id="last-name" autocomplete="family-name"
                                       class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                {errors.country.error  && submitted ?
                                    <p style={{fontSize: '10px'}} className="text-red-600  sm:m-0 error-message">{errors.country.message}</p> : null}
                            </div> : null}

                            {config?.zip_Code?.display ?
                            <div class="col-span-6 sm:ml-3 sm:mr-3 sm:col-span-3">
                                <label for="zip_Code" style={{color: layoutConfig.BodyTextColor}} class="block text-sm font-medium text-gray-700">{content?.zipCode}</label>
                                <input type="number" onInput={($event) => this.handleChange($event, 'zip_Code')}
                                       name="zip_Code" id="zip_Code" autocomplete="zip_Code" minLength={config?.zip_Code?.minLength} maxLength={config?.zip_Code?.maxLength}
                                       class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                {errors.zip_Code.error  && submitted ?
                                    <p style={{fontSize: '10px'}} className="text-red-600  sm:m-0 error-message">{errors.zip_Code.message}</p> : null}
                            </div> : null}
                            {config?.email?.display ?
                            <div class="col-span-6 sm:ml-3 sm:mr-3 sm:col-span-3">
                                <label for="email-address" style={{color: layoutConfig.BodyTextColor}} class="block text-sm font-medium text-gray-700">{content?.email}</label>
                                <input type="text" onInput={($event) => this.handleChange($event, 'email')}
                                       name="email-address" id="email-address" autocomplete="email"
                                       class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                {errors.email.error  && submitted ?
                                    <p style={{fontSize: '10px'}} className="text-red-600  sm:m-0 error-message">{errors.email.message}</p> : null}
                            </div> : null}
                        </div>
                    </div>
                </div>
                {config?.privacy_Policy?.display ?
                <div class="flex sm:ml-8 items-start">
                    <div class="flex items-center h-5">
                        <input id="candidates" onChange={($event) => this.handleChange($event, 'privacyPolicy')} name="candidates" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                    </div>
                    <div class="ml-3 text-sm">
                        <label for="candidates" class="font-medium text-gray-700">{content?.privacyText} <a target="_blank" href={this.props.configurationData.Configuration?.Links?.TermAndConditionLink}>{content?.termAndCondition}</a> &
                            <a target="_blank" href={this.props.configurationData.Configuration?.Links?.PrivacyLink}>{content?.privacyPolicy}</a></label>
                    </div>
                </div> : null}
                <div style={{marginLeft: '70px'}} class="col-span-12">
                    {errors.privacyPolicy.error  && submitted ?
                        <p style={{fontSize: '10px'}} className="text-red-600  sm:m-0 error-message">{errors.privacyPolicy.message}</p> : null}
                </div>
                <div className={'col-span-12 justify-center mt-5 text-center'}>
                    <button style={{color: layoutConfig.SubscribeButtonTextColor, backgroundColor:layoutConfig.SubscribeButtonBackgroundColor, }} type="submit" class="cursor-pointer mt-3 w-48 inline-flex justify-center rounded-md border border-blue-300
                            shadow-sm px-4 py-2 bg-blue-300 text-base font-medium text-gray-700 hover:bg-red-700
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:text-sm">
                        {content?.subscribeButtonText}
                    </button>
                </div>
            </form>
            </Fragment>
        );
    }
}
