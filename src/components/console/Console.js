import React, {Component} from 'react';
import SPS from 'simple-pub-sub';
import classnames from 'classnames';


class Console extends Component {
    constructor (props, context) {
        super(props, context);

        this.state = {
            isShow: false,
            logs: []
        };

        this.makeConsole();

        SPS.on('tabToggle', (curTab) => {
            this.setState({
                isShow: curTab === 'console'
            });
        });
    }

    makeConsole() {
        window.console = {
            wc: window.console
        };

        const me = this;
        ['log', 'error', 'warn', 'debug', 'info'].forEach((item) => {
            console[item] = function () {
                // React.js的警告信息
                // if(arguments[0].startsWith('Warning: ')) {
                //     return;
                // }

                // 执行原来的console
                this.wc[item].apply(this.wc, Array.prototype.slice.call(arguments));
                me.log(arguments, item);
            };
        });
    }

    log(msgs, type) {
        let i = 0;
        const len = msgs.length;
        let output = "";

        try {
            for (; i < len; i++) {
                output += this.toOutput(msgs[i]) + "\n";
            }

            this.setState({
                logs: this.state.logs.concat({
                    type: type,
                    msg: output
                })
            });
        } catch (e) {
            output = "";
            i = 0;

            for (; i < len; i++) {
                output += msgs[i] + "  ";
            }

            this.setState({
                logs: this.state.logs.concat({
                    type: type,
                    msg: output
                })
            });
        }
    }

    toOutput(obj) {
        if(this.isFunction(obj)){
            return obj.toString();
        }else{
            return JSON.stringify(obj, null, "\t");
        }
    }

    isFunction(obj) {
        return Object.prototype.toString.call(obj) == '[object Function]';
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
                }}>欢迎使用 mdebug，这是console面板。</div>
                <div className="de-log">
                    {this.state.logs.map((item) => {
                        return (
                            <pre className={"de-item de-item-" + item.type}>{item.msg}</pre>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Console;
