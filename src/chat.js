

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';

//-- React Implementation ------------------------
export default function Chat(props) {
    const messages = [];
    messages.push(messageGenerate("Derp", "Herp a derp."));
    return (
        <div className="chat-main">
            <ChatOutput messages={messages} />
            <ChatInput />
        </div>
    );
}


//==============================================================================

function messageGenerate(username, body) {
    return {username, body};
}
function ChatOutput(props) {
    const messagesJSX = props.messages.map(message => (
        <Message
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
function ChatInput(props) {
    return <React.Fragment />
}
function Message(props) {
    return (
        <div className="message">
            <span className="message_username" children={props.username} />
            <span className="message_body" children={props.body} />
        </div>
    );
}
