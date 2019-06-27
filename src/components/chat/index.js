

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
            <div className="chat_main">
                <ChatOutput messages={this.state.messages} />
                <ChatInput sendMessage={this.sendMessage} />
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
class ChatOutput extends React.Component {
    constructor(props) {
        super(props);
        this.displayReference = React.createRef();
    }
    render() {
        // Determine if display is scrolled to bottom
        let scrollAtBottom = true;
        const displayOld = this.displayReference.current;
        if (displayOld) {
            const scrollDelta = displayOld.scrollHeight - displayOld.scrollTop;
            if(scrollDelta !== displayOld.clientHeight) {
                scrollAtBottom = false;
            }
        }
        // Keep scroll at bottom after render
        if (scrollAtBottom) {
            requestAnimationFrame(() => {
                const display = this.displayReference.current;
                display.scrollTop = display.scrollHeight;
            });
        }
        // Compile messages into React components
        const messagesJSX = this.props.messages.map(message => (
            <Message
                key={message.id}
                username={message.username}
                body={message.body}
            />
        ));
        // Render display area with messages
        return (
            <div ref={this.displayReference} className="chat_output">
                <div className="chat_outputbuffer" />
                {messagesJSX}
            </div>
        );
    }
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
            <form className="chat_input" onSubmit={this.onSubmit}>
                <span className="chat_inputprompt">Mensaje: </span>
                <input
                    autofocus="true"
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
