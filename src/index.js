import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

const Application = () => (
        <App/>
);
ReactDOM.render(<Application/>, document.getElementById('root'));

