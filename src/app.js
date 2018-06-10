import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';
import 'normalize.css/normalize.css';
// install and use normalize.css to avoid cross-browser issues, modify webpack config to use both css and scss file
import './styles/styles.scss';
// to use css, we have to install css-loader and style-loader, then add them to webpack config file.
// to use scss, install node-sass, sass-loader, add sass-loader to webpack (sass-loader will run node-sass automatically), and change the file type to .scss.

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));