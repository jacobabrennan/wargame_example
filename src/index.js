

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import Chat from './components/chat';
import RedButton from './components/redbutton';

//-- React Implementation ------------------------
const layout = (
    <React.Fragment>
        <div class="footer-spacer">
            <header>
                <a href="/">
                    {/*<!--img alt="Splash Logo" src="/rsc/img/splash.png" /-->*/}
                    <h1 class="wordmark">Chat de Botón</h1>
                </a>
                {/*<nav>
                    <a href="/logout">Logout</a>
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </nav>*/}
            </header>
            <div className="container">
                <RedButton />
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
