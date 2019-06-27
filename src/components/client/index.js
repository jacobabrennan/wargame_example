

//== Red Button Website Client =================================================

//-- Dependencies --------------------------------
import React from 'react';
import './client.css';
import Chat from '../chat';
// import RedButton from '../redbutton';

const TEXT_PROJECT_TITLE = 'Chat de Botón';
const TEXT_ATTRIBUTION = 'Concepto y diseño web por';

//-- React Implementation ------------------------
export default class Client extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            connection: new WebSocket(props.connectTo),
        };
    }
    render() {
        return (
            <div className="container">
                <header>
                    <a href="/">
                        <h1 class="wordmark">{TEXT_PROJECT_TITLE}</h1>
                    </a>
                </header>
                <main>
                    {/* <RedButton connection={this.state.connection} /> */}
                    <Chat connection={this.state.connection} />
                </main>
                <footer>
                    <div class="contact">
                        <span>{TEXT_ATTRIBUTION} <a href="http://twitter.com/AntlerPig">JacobABrennan</a></span>
                    </div>
                </footer>
            </div>
        );
    }
}
