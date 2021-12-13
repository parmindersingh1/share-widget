import { Fragment, Component, h } from 'preact';

import { EventEmitter } from 'events';
import { Config } from '../types';

import { setVisible } from '../utils/dom'



import './app.module.scss';
import Banner from './banner/banner';
import SideBar from './sidebar/sidebar';
import Bottom from './bottom/bottom';
// import '../style/index.css';

interface AppProps extends Config {
    containerClassName: string,
    ee?: EventEmitter;
}

// Types for state
type ExpandableState = {
    containerClassName?: string,
    toggled: boolean,
};


class App extends Component<AppProps, ExpandableState> {
    private containerClassName: string;
    constructor(props: AppProps) {
        super(props);
        this.state = {
            containerClassName: props.containerClassName,
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

        if (this.props.type=="sidebar"){
            return (
                <SideBar></SideBar>
            )    
        }
        if (this.props.type=="banner"){
            return (
                <Banner 
                toggled={this.state.toggled}
                config={this.props}
                handleClick  = {this.handleClick}
              />
            )    
        }if (this.props.type=="bottom"){
            return (
                <Bottom 
                toggled={this.state.toggled}
                config={this.props}
                handleClick  = {this.handleClick}
              />
            )    
        }else{
        return (
            <Fragment>
             <Banner 
                toggled={this.state.toggled}
                config={this.props}
                handleClick  = {this.handleClick}
              />
              <SideBar></SideBar>
            </Fragment>
            )
                
        }
    }

}


export default App;