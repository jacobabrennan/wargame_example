

//== Chat System ===============================================================

//-- Dependencies --------------------------------
import React from 'react';
import './chat.css';

//-- Project Constants ---------------------------
const URL_CONNECTION = `ws:${(new URL(document.URL)).host}/current`;


//== React Implementation ======================================================

//-- Component Definition & Initialization -------
export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            connection: null,
            messages: [],
        };
    }
    
    //-- React Lifecycle Methods ---------------------
    componentDidMount() {
        const connection = new WebSocket(URL_CONNECTION);
        connection.onopen    = (event => this.websocketOpen   (event));
        connection.onclose   = (event => this.websocketClose  (event));
        connection.onerror   = (event => this.websocketError  (event));
        connection.onmessage = (event => this.websocketMessage(event));
        this.setState({connection: connection});
    }
    render() {
        return (
            <div className="chat-main">
                <ChatOutput messages={this.state.messages} />
                <ChatInput sendMessage={this.sendMessage} />
                <button className="redbutton" />
            </div>
        );
    }
    
    //-- Interaction ---------------------------------
    sendMessage = (messageBody) => {
        this.state.connection.send(messageBody);
    }

    //-- Websocket Event Handlers --------------------
    websocketOpen(event) {
        console.log('Connection Open', event);
    }
    websocketClose(event) {
        console.log('Connection Closed', event);
    }
    websocketError(event) {
        console.log('Websocket Error', event);
    }
    websocketMessage(event) {
        console.log('Websocket Received Message', event);
        const messages = this.state.messages.slice();
        messages.push(JSON.parse(event.data));
        this.setState({
            messages: messages,
        });
    }
}


//== Subcomponents =============================================================

//-- Output - Message Display Area ---------------
function ChatOutput(props) {
    const messagesJSX = props.messages.map(message => (
        <Message
            key={message.id}
            username={message.username}
            body={message.body}
        />
    ));
    return (
        <div>
            {messagesJSX}
        </div>
    );
}

//-- Input - Message composition & submission ----
class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: '',
        };
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type="text"
                    value={this.state.body}
                    onChange={this.updateValue}
                />
            </form>
        );
    }
    updateValue = (eventUpdate) => {
        this.setState({body: eventUpdate.target.value});
    }
    onSubmit = (eventSubmit) => {
        eventSubmit.preventDefault();
        this.props.sendMessage(this.state.body);
        this.setState({body: ''});
    }
}

//-- Message - Individual chat line --------------
function Message(props) {
    return (
        <div className="message">
            <span className="message_username" children={props.username} />
            <span className="message_body" children={props.body} />
        </div>
    );
}
