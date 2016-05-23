import React, {Component} from 'react';
import SPS from 'simple-pub-sub';
import classnames from 'classnames';

class Resources extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isShow: false,
            cookie: this.getCookie(),
            storage: this.getStorage()
        };

        SPS.on('tabToggle', (curTab) => {
            this.setState({
                isShow: curTab === 'resources'
            });
        });
    }

    getCookie() {
        var cookie = document.cookie;
        var output = {};

        cookie.split(/\s*;\s*/).forEach(function(pair) {
            pair = pair.split(/\s*=\s*/);
            output[pair[0]] = pair.splice(1).join('=');
        });

       return JSON.stringify(output, null, "\t");
    }

    getStorage() {
        const output={};

        for (const key in window.localStorage) {
            output[key]=window.localStorage[key];
        }

        return JSON.stringify(output, null, "\t");
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
                }}>欢迎使用 mdebug，这是Resources面板。</div>
                <div className="de-item de-item-log">
                    <div className="de-url">Cookie</div>
                    <pre className="de-json"><code>{this.state.cookie}</code></pre>
                </div>
                <div className="de-item de-item-log">
                    <div className="de-url">LocalStorage</div>
                    <pre className="de-json"><code>{this.state.storage}</code></pre>
                </div>
            </div>
        );
    }
}

export default Resources;
