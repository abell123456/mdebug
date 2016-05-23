import React, {Component} from 'react';

class Toolbar extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className='de-toolbar'>
                <a className='de-tool de-clear'>Clear</a>
                <a className='de-tool de-tool-last de-hide'>Hide</a>
            </div>
        );
    }
}

export default Toolbar;
