import React, {Component} from 'react';
import SPS from 'simple-pub-sub';
import classnames from 'classnames';

import timing from 'timing.js';

import './timeline.scss';

class Timeline extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isShow: false,
            timeline: []
        };

        this.makeNetwork();

        SPS.on('tabToggle', (curTab) => {
            this.setState({
                isShow: curTab === 'timeline'
            });
        });
    }

    initTimeline() {
        const data = timing.printSimpleTable();

        const ary = [];

        for (let key in data) {
            if(data.hasOwnProperty(key)) {
                ary.push({
                    msg: key + ': ' + Math.round(data[key])
                });
            }
        }

        this.setState({
            timeline: ary
        });
    }

    checkJSorCSS(src) {
        const xmlhttp = new window.XMLHttpRequest.realXHR;

        xmlhttp.open("GET", src);

        xmlhttp.onreadystatechange = function () {
            if ((xmlhttp.status == 200) && (xmlhttp.readyState == 4)) {

            } else if(xmlhttp.status == 404) {
                console.error(src+' 404 (Not Found)');
            }
        };

        xmlhttp.send();
    }

    checkImg(src) {
        const img = new Image();

        img.onerror=function(){
            console.error(src+' 404 (Not Found)');
        };

        img.src = src;
    }

    makeNetwork() {
        window.addEventListener('load', () => {
            this.initTimeline();

            const cssList = document.querySelectorAll('link[rel="stylesheet"]');
            const jsList = document.querySelectorAll('script');
            const imgList = document.querySelectorAll('img');

            for (let i = 0, len = cssList.length; i < len; i++) {
                const href = cssList[i].getAttribute('href');

                if (href) {
                    this.checkJSorCSS(href);
                }
            }

            for (let i = 0, len = jsList.length; i < len; i++) {
                const url = jsList[i].getAttribute('src');

                if (url) {
                    this.checkJSorCSS(url);
                }
            }

            for (let i = 0, len = imgList.length; i < len; i++) {
                const src = imgList[i].getAttribute('src');

                if (src) {
                    this.checkImg(src);
                }
            }
        });
    }

    getClassNames() {
        return classnames({
            'de-logs': true,
            'de-active': this.state.isShow
        });
    }

    render() {
        return (
            <div class={this.getClassNames()}>
                <div class="de-log">
                    {this.state.timeline.map((item) => {
                        return (<p class="de-item de-item-log">{item.msg}</p>);
                    })}
                </div>
            </div>
        );
    }
}

export default Timeline;
