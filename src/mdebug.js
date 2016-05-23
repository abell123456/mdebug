import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Container from './components/container/Container';

ReactDOM.render(
    <div>
        <div className='de-mask'></div>
        <Container />
    </div>,
    document.querySelector('body')
);
