import React, {Component} from 'react';
import SPS from 'simple-pub-sub';
import classnames from 'classnames';

import timing from './timing';

class Timeline extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isShow: false,
            timelines: []
        };

        SPS.on('tabToggle', (curTab) => {
            this.setState({
                isShow: curTab === 'timeline'
            });
        });

        this.makeNetwork();
    }

    initTimeline() {
        const timingData = timing.printSimpleTable();

        const ary = [];

        for (let key in timingData) {
            if(timingData.hasOwnProperty(key)) {
                ary.push({
                    msg: key + ': ' + Math.round(timingData[key])
                });
            }
        }

        this.setState({
            timelines: ary
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
        if(this._loaded) {
            return;
        }

        this._loaded = true;

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
            <div className={this.getClassNames()}>
                <div style={{
                    color: '#6a5acd',
                    margin: 0,
                    padding: '6px 8px',
                    lineHeight: 1.3,
                    borderBottom: '1px solid #eee',
                    wordBreak: 'break-word'
                }}>欢迎使用 mdebug，这是Timeline面板。</div>
                <div className="de-log">
                    {this.state.timelines.map((item) => {
                        return (<p className="de-item de-item-log">{item.msg}</p>);
                    })}
                </div>
            </div>
        );
    }
}

export default Timeline;
