

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
    <div className="container">
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
        <main>
            <RedButton />
            <Chat />
        </main>
        <footer>
            <div class="contact">
                <span>Concepto y diseño web por <a href="http://twitter.com/AntlerPig">JacobABrennan</a></span>
            </div>
        </footer>
    </div>
);
ReactDOM.render(layout, document.getElementById('root'));
