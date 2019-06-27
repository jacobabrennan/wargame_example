

//== Website Initialization ====================================================

//-- Dependencies --------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import Client from './components/client';

//-- Project Constants ---------------------------
const URL_CONNECTION = `ws:${(new URL(document.URL)).host}/current`;

//-- Mount Client to DOM -------------------------
const layout = (
    <Client connectTo={URL_CONNECTION} />
);
ReactDOM.render(layout, document.getElementById('root'));
