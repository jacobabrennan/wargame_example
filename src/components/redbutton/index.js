

/*== Red Button ================================================================

This module exports a React Component, RedButton, which displays a red clickable
button. This button communicates with the server to display the test's current
status: pressed or unpressed. Upon pressing the botton, a message is sent to the
test server informing all users that the botton has been pressed, and the test
has ended. The button also receives this status from the server, though props,
and displays to all users the current pressed status.

    RedButton props:
        connection (mandatory): a WebSocket object
        pressed (boolean, mandatory): the pressed status of the test

*/

//-- Dependencies --------------------------------
import React from 'react';
import './redbutton.css';
import language from '../../language.js';

//-- Project Constants ---------------------------
const TEXT_BUTTON_WARNING = language.BUTTON_WARNING;
const TEXT_BUTTON_RESOLUTION = language.BUTTON_RESOLUTION;

//-- Main React Component ------------------------
export default function (props) {
    function handleClick() {
        const data = {button: true}
        props.connection.send(JSON.stringify(data));
    }
    let pressed = '';
    let displayText = TEXT_BUTTON_WARNING;
    if (props.pressed) {
        pressed = 'pressed';
        displayText = TEXT_BUTTON_RESOLUTION;
    }
    return (
        <div className={`redbutton_container ${pressed}`}>
            <span>{displayText}</span>
            <button
                className="redbutton"
                onClick={handleClick}
            />
            <span>{displayText}</span>
        </div>
    );
}
