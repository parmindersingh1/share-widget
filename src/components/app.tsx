import { Fragment, Component, h } from 'preact';
import './app.module.scss';

import '../style/Index-tailwind.css'
import './Style.css'
import { ShareIcons } from './ShareIcons';

// Types for state
type ExpandableState = {
    configuration?: any
};


class App extends Component<any, ExpandableState> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            configuration: props.Configuration
        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <Fragment>
                {(this.state.configuration?.position && this.state.configuration?.icons ) ?
                <div class="share-icons">
                    <ShareIcons  position={this.state.configuration.position} icons={this.state.configuration.icons || []}/>
                </div> : null}
            </Fragment>
            )
                
        }

}


export default App;
