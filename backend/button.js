

/*== Red Button ================================================================

*/

//-- Dependencies --------------------------------
const connectionManager = require('./connection_manager.js');

//-- Project Constants ---------------------------
const SOCKET_MESSAGE = 'message';

//-- Scaffolding ---------------------------------
const button = module.exports = {
    pressed: false,
    handleMessage(client, action) {
        // Do nothing if the button is already pressed
        if(button.pressed) { return;}
        // Do nothing if they didn't press the button
        if (!action) { return;}
        // DID THEY PRESS THE BUTTON!?
        this.pressed = client.userId;
        const data = {button: true};
        connectionManager.broadcast(data);
    },
    configureClient(clientNew) {
        if (this.pressed) {
            const data = {button: true};
            clientNew.connection.send(JSON.stringify(data));
        }
        clientNew.connection.on(SOCKET_MESSAGE, (data) => {
            data = JSON.parse(data);
            if (data.button) {
                this.handleMessage(clientNew, data);
            }
        });
    },
};
