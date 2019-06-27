

//== Chat System ===============================================================

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
