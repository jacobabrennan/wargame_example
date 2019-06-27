

//== Red Button Website Client =================================================

//-- Dependencies --------------------------------
import React from 'react';
import './client.css';
import Chat from '../chat';
import language from '../../language';
import RedButton from '../redbutton';

//-- Project Constants ---------------------------
const URL_ATTRIBUTION = 'http://twitter.com/AntlerPig';
const URL_ATTRIBUTION_TEXT = 'JacobABrennan'
const TEXT_PROJECT_TITLE = language.PROJECT_TITLE;
const TEXT_ATTRIBUTION = language.ATTRIBUTION;

//-- React Implementation ------------------------
export default class Client extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            connection: new WebSocket(props.connectTo),
        };
    }
    render() {
        return (
            <div className="container">
                <header>
                    <a href="/">
                        <h1 class="wordmark">{TEXT_PROJECT_TITLE}</h1>
                    </a>
                </header>
                <main>
                    <RedButton connection={this.state.connection} />
                    <Chat connection={this.state.connection} />
                </main>
                <footer>
                    <div class="contact">
                        <span>{TEXT_ATTRIBUTION} <a href={URL_ATTRIBUTION}>{URL_ATTRIBUTION_TEXT}</a></span>
                    </div>
                </footer>
            </div>
        );
    }
}
