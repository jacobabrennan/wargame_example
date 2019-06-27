

//== Chat System ===============================================================

//-- Dependencies --------------------------------
import React from 'react';
import './chat.css';
import language from '../../language.js';

//-- Project Constants ---------------------------
const TEXT_COMMAND_PROMPT = language.COMMAND_PROMPT;


//== Main Component - Full Chat Client =========================================

//-- Definition and Initialization ---------------
export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        props.connection.addEventListener('message', this.receiveMessage);
        this.state = {
            messages: [],
        };
    }
    
    //-- React Lifecycle -----------------------------
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
        let data = {chat: messageBody};
        data = JSON.stringify(data);
        this.props.connection.send(data);
    }
    receiveMessage = (eventMessage) => {
        // Only handle messages that include chat data
        const data = JSON.parse(eventMessage.data);
        const chat = data.chat;
        if (!chat) { return;}
        // Parse the chat data into a new message
        const messages = this.state.messages.slice();
        messages.push(chat);
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
                <span className="chat_inputprompt">{TEXT_COMMAND_PROMPT}</span>
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
