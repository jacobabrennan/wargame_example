

//== Chat System ===============================================================

//-- Dependencies --------------------------------
import React from 'react';
import './redbutton.css';
import language from '../../language.js';

//-- Project Constants ---------------------------
const TEXT_BUTTON_WARNING = language.BUTTON_WARNING;


//== React Implementation ======================================================

//-- Component Definition & Initialization -------
export default class RedButton extends React.Component {
    
    //-- React Lifestyle -----------------------------
    render() {
        return (
            <div className="redbutton_container">
                <span>{TEXT_BUTTON_WARNING}</span>
                <button className="redbutton" onClick={this.handleClick} />
                <span>{TEXT_BUTTON_WARNING}</span>
            </div>
        );
    }
    
    //-- Interaction ---------------------------------
    handleClick = (eventClick) => {
        
    }
}
