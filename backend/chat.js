

/*== Chat Room =================================================================

*/

//-- Project Constants ---------------------------
const SOCKET_ERROR   = 'error';
const SOCKET_MESSAGE = 'message';
const SOCKET_CLOSE   = 'close';

//-- Scaffolding ---------------------------------
const chat = module.exports = {
    clients: {},
    messages: [],
    clientAdd(userId, username, webSocket) {
        // Construct new chat client
        const clientNew = {
            id: Symbol(),
            userId: userId,
            username: username,
            connection: webSocket,
        };
        // Store client
        this.clients[clientNew.id] = clientNew;
        // Add event listeners to webSocket connection
        webSocket.on(SOCKET_ERROR, (data) => {
            console.log('Error:', data);
        });
        webSocket.on(SOCKET_MESSAGE, (data) => {
            this.messageReceive(clientNew, data);
        });
        webSocket.on(SOCKET_CLOSE, (data) => {
            this.clientRemove(clientNew);
        });
    },
    clientRemove(clientOld) {
        delete this.clients[clientOld.id];
    },
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
        const messageString = JSON.stringify(message)
        Object.getOwnPropertySymbols(this.clients).forEach(symbol => {
            const client = this.clients[symbol];
            client.connection.send(messageString);
        });
    },
};