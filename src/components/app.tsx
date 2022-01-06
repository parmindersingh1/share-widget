import { Fragment, Component, h } from 'preact';

import { EventEmitter } from 'events';
import { Config } from '../types';

import { setVisible } from '../utils/dom'
import './app.module.scss';
import {NewsLetterPopUpComponent} from './NewsLetter-PopUp-component';

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
    private containerClassName: string;
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

    handleClick = () => {
        // debugger;
        this.setState({
            toggled: !this.state.toggled
        });
        console.log(this.state.toggled)
        setVisible(false);
        // debugger;
    }

    render() {

        return (
            <Fragment>
                <div class="font-sans">
                    <NewsLetterPopUpComponent configurationData={this.state.configuration} />
                </div>
            </Fragment>
            )
                
        }

}


export default App;
