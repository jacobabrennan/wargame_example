

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import Chat from './chat';

//-- React Implementation ------------------------
const layout = (
    <React.Fragment>
        <div class="footer-spacer">
            <header>
                <a href="/">
                    {/*<!--img alt="Splash Logo" src="/rsc/img/splash.png" /-->*/}
                    <h1 class="wordmark">Red Button Chat</h1>
                </a>
                <nav>
                    <a href="/logout">Logout</a>
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </nav>
            </header>
            <div className="container">
                <button className="redbutton" />
                <Chat />
            </div>
        </div>
        <footer>
            <div class="contact">
                <span>Concept &amp; Web Design by <a href="http://twitter.com/AntlerPig">JacobABrennan</a></span>
            </div>
        </footer>
    </React.Fragment>
);
ReactDOM.render(layout, document.getElementById('root'));
