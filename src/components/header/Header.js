import React, {Component} from 'react';
import SPS from 'simple-pub-sub';
import classnames from 'classnames';

class Header extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            curTab: 'console'
        };
    }

    handleTabClick(tabName) {
        this.setState({
            curTab: tabName
        });

        SPS.trigger('tabToggle', tabName);
    }

    getTabClass(curTab) {
        return classnames({
            'de-tab': true,
            'de-active': this.state.curTab === curTab
        });
    }

    render() {
        return (
            <div
                className='de-tabbar'
            >
                <a className={this.getTabClass('console')} onClick={this.handleTabClick.bind(this, 'console')}>Console</a>
                <a className={this.getTabClass('xhr')} onClick={this.handleTabClick.bind(this, 'xhr')}>XHR</a>
                <a className={this.getTabClass('resources')} onClick={this.handleTabClick.bind(this, 'resources')}>Resources</a>
                <a className={this.getTabClass('timeline')} onClick={this.handleTabClick.bind(this, 'timeline')}>Timeline</a>
            </div>
        );
    }
}

export default Header;
