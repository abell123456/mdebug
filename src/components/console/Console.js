import React, {Component} from 'react';
import SPS from 'simple-pub-sub';
import classnames from 'classnames';

import './console.scss';

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
            <div class={this.getClassNames()}>
                <div class="de-log">
                    {this.state.logs.map((item) => {
                        return (
                            <pre class={"de-item de-item-" + item.type}>{item.msg}</pre>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Console;
