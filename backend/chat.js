

/*== Chat Room =================================================================

*/

//-- Dependencies --------------------------------
const connectionManager = require('./connection_manager.js');

//-- Project Constants ---------------------------
const SOCKET_MESSAGE = 'message';

//-- Scaffolding ---------------------------------
module.exports = {
    messages: [],
    messageReceive(client, body) {
        if (!body) { return;}
        // Construct message from text received from client
        const message = {
            id: this.messages.length,
            userId: client.userId,
            username: client.username,
            body: body,
        };
        // Add message to messages
        this.messages.push(message);
        // Broadcast message to each client
        const data = {chat: message};
        connectionManager.broadcast(data);
    },
    configureClient(client) {
        client.connection.on(SOCKET_MESSAGE, (data) => {
            data = JSON.parse(data);
            const chatBody = data.chat;
            if (chatBody) {
                this.messageReceive(client, chatBody);
            }
        });
    }
};
