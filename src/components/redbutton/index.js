

//== Chat System ===============================================================

//-- Dependencies --------------------------------
import React from 'react';
import './redbutton.css';
import language from '../../language.js';

//-- Project Constants ---------------------------
const TEXT_BUTTON_WARNING = language.BUTTON_WARNING;

//-- Main React Component ------------------------
export default function (props) {
    function handleClick() {
        const data = {button: true}
        props.connection.send(JSON.stringify(data));
    }
    return (
        <div className="redbutton_container">
            <span>{TEXT_BUTTON_WARNING}</span>
            <button
                className="redbutton"
                onClick={handleClick} />
            <span>{TEXT_BUTTON_WARNING}</span>
        </div>
    );
}
