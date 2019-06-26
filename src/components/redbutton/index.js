

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
                <span>¡Peligro: No hagas clic!</span>
                <button className="redbutton" />
                <span>¡Peligro: No hagas clic!</span>
            </div>
        );
    }
}
