

//== Connection Manager ========================================================

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
