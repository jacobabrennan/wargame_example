

/*== Connection Manager ========================================================

This module provides a connectionManager opject to handle WebSocket connections.
Each connection is associated with a unique symbol, and broadcasts can be sent
to all users at once. Notably, a single user can have multiple connections (such
as a single user with the website open in multiple tabs). The connectionManager
is used by both the Chat and Button modules.

*/

//-- Project Constants ---------------------------
const SOCKET_CLOSE   = 'close';

//------------------------------------------------
module.exports = {
    clients: {},
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
        // Listen for disconnection events
        webSocket.on(SOCKET_CLOSE, (data) => {
            this.clientRemove(clientNew);
        });
        // Return new client
        return clientNew;
    },
    clientRemove(clientOld) {
        delete this.clients[clientOld.id];
    },
    broadcast(data) {
        const dataString = JSON.stringify(data)
        Object.getOwnPropertySymbols(this.clients).forEach(symbol => {
            const client = this.clients[symbol];
            client.connection.send(dataString);
        });
    }
};
