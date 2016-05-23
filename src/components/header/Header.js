import React, {Component} from 'react';
import SPS from 'simple-pub-sub';

import './header.scss';

class Header extends Component {
    constructor(props, context) {
        super(props, context);
    }

    handleTabClick(tabName) {
        console.log(tabName);
        SPS.trigger('tabToggle', tabName);
    }

    render() {
        return (
            <div
                className='de-tabbar'
            >
                <a className='de-tab de-active' onclick={this.handleTabClick.bind(this, 'console')}>Console</a>
                <a className='de-tab' onclick={this.handleTabClick.bind(this, 'xhr')}>XHR</a>
                <a className='de-tab' onclick={this.handleTabClick.bind(this, 'resources')}>Resources</a>
                <a className='de-tab' onclick={this.handleTabClick.bind(this, 'timeline')}>Timeline</a>
            </div>
        );
    }
}

export default Header;
