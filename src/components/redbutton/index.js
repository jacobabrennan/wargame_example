

//== Chat System ===============================================================

//-- Dependencies --------------------------------
import React from 'react';
import './redbutton.css';

//-- Project Constants ---------------------------


//== React Implementation ======================================================

//-- Component Definition & Initialization -------
export default class RedButton extends React.Component {
    render() {
        return (
            <div className="redbutton_container">
                <span>Achtung! Klicke nicht!</span>
                <button className="redbutton" />
                <span>Achtung! Klicke nicht!</span>
            </div>
        );
    }
}
