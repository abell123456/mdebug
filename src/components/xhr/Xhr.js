import React, {Component} from 'react';
import timing from '../timeline/timing';
import SPS from 'simple-pub-sub';
import classnames from 'classnames';

class Xhr extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isShow: false,
            xhrs: []
        };

        this.makeXhr();

        SPS.on('tabToggle', (curTab) => {
            this.setState({
                isShow: curTab === 'xhr'
            });
        });
    }

    makeXhr() {
        (function(open){
            window.XMLHttpRequest.prototype.open = function(){
                this.mdebugMethod = arguments[0];
                this.mdebugUrl = arguments[1];
                open.apply(this, arguments);
            };
        })(window.XMLHttpRequest.prototype.open);

        const XHR = window.XMLHttpRequest;

        window.XMLHttpRequest = function(){
            let xhr = new XHR();
            checkSuccess(xhr);

            return xhr;
        };

        window.XMLHttpRequest.realXHR = XHR;

        const self=this;

        function checkSuccess(xhr) {
            let isAvailable = true;

            try {
                const xx = xhr.status;
            } catch (e) {
                isAvailable = false;
            };

            if (isAvailable) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    try {
                        this.setState({
                            xhrs: this.state.xhrs.concat({
                                method: xhr.mdebugMethod,
                                rqsUrl: xhr.mdebugUrl,
                                rspUrl: xhr.responseURL,
                                json: JSON.stringify(JSON.parse(xhr.responseText), null, "\t")
                            })
                        });
                    } catch (e) {
                        this.setState({
                            xhrs: this.state.xhrs.concat({
                                method: xhr.mdebugMethod,
                                rqsUrl: xhr.mdebugUrl,
                                rspUrl: xhr.responseURL,
                                json: xhr.responseText
                            })
                        });
                    }
                }else if(xhr.status>=400) {
                    console.error(xhr.responseURL + ' ' + xhr.status + ' (' + xhr.statusText + ')');
                }
                else{
                    window.setTimeout(function () {
                        checkSuccess(xhr);
                    }, 0);
                }
            }else{
                window.setTimeout(function () {
                    checkSuccess(xhr);
                }, 0);
            }
        }
    }

    checkImg(src) {
        const img = new Image();

        img.onerror = function(){
            console.error(src+' 404 (Not Found)');
        };

        img.src = src;
    }

    checkJSorCSS(src) {
        const xmlhttp = new window.XMLHttpRequest.realXHR;
        xmlhttp.open("GET", src);

        xmlhttp.onreadystatechange = function () {
            if ((xmlhttp.status == 200) && (xmlhttp.readyState == 4)) {
            }else if(xmlhttp.status == 404){
                console.error(src+' 404 (Not Found)');
            }
        };

        xmlhttp.send();
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
                }}>欢迎使用 mdebug，这是XHR面板。</div>
                <div className='de-log'>
                    {this.state.xhrs.map((item) => {
                        return (
                            <div>
                                <div className="at-item at-item-log">
                                    <div className="at-url"><div></div><span>[Request Url]</span></div>
                                    <div className="at-sub-dt"><span>{item.method}</span>: {item.rqsUrl}</div>
                                </div>
                                <div className="at-item at-item-log">
                                    <div className="at-url"><span>[Response Url]</span></div>
                                   <div className="at-sub-dt">{item.rspUrl}</div>
                                </div>
                                <div className="at-item at-item-log">
                                    <div className="at-url"><span>[Response Data]</span></div>
                                    <pre className="at-json"><code>{item.json}</code></pre>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Xhr;
