

/*== Red Button Website Client =================================================

This module exports a React component, the Client, which defines the layout of
the entire Red Button website. The main features of this client are a live
WebSockets connect, the chat area, and the button itself.

    Client props:
        connectTo (string, mandatory): a URL

*/

//-- Dependencies --------------------------------
import React from 'react';
import './client.css';
import language from '../../language';
import Chat from '../chat';
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
        // Setup websocket connection
        const connection = new WebSocket(props.connectTo)
        connection.addEventListener('message', this.handleMessage);
        // Do React initialization
        this.state = {
            connection: connection,
            pressed: false,
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
                    <RedButton
                        connection={this.state.connection}
                        pressed={this.state.pressed}
                    />
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
    handleMessage = (messageEvent) => {
        // Listen for button press events
        const data = JSON.parse(messageEvent.data);
        const button = data.button;
        if (!button) { return;}
        //
        this.setState({pressed: true});
    }
}
