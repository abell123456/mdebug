import React, {Component} from 'react';
import SPS from 'simple-pub-sub';

// 导入各个子组件
import Header from '../header/Header';
import Console from '../console/Console';
import Resources from '../resources/Resources';
import Timeline from '../timeline/Timeline';
import Xhr from '../xhr/Xhr';

import './container.scss';

class Container extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className='de-panel'>
                <Header />
                <div className='de-content'>
                    <Console />
                    <Resources />
                    <Xhr />
                    <Timeline />
                </div>
            </div>
        );
    }

    componentDidMount() {
        SPS.trigger('tabToggle', 'console');
    }
};

export default Container;
