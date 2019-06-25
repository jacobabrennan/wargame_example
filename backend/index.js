

//==============================================================================

//-- Dependencies --------------------------------
const express = require('express');
const path = require('path');

//-- Project Constants ---------------------------
const URL_CLIENT = '/';
const URL_CHAT = '/';
const SOCKET_ERROR   = 'error';
const SOCKET_MESSAGE = 'message';
const SOCKET_CLOSE   = 'close';

//-- Scaffolding ---------------------------------
const clients = {};
let messageCount = 0;

//-- Configure & Export Router -------------------
const router = module.exports = express.Router();

//-- Handle Chat (via websockets) ----------------
router.ws(URL_CHAT, function(webSocket, request) {
    //
    const user = request.auth;
    if (!user) { return;}
    //
    clients[user.id] = {
        id: user.id,
        username: user.username,
        connection: webSocket,
    };
    webSocket.on(SOCKET_ERROR, function (data) {
        console.log('error', data);
    });
    webSocket.on(SOCKET_MESSAGE, function (data) {
        const message = {
            id: messageCount++,
            username: user.username,
            body: data,
        };
        const messageString = JSON.stringify(message)
        Object.keys(clients).forEach(key => {
            const client = clients[key];
            client.connection.send(messageString);
        });
    });
    webSocket.on(SOCKET_CLOSE, function (data) {
        delete clients[user.id];
    });
});

//-- Serve React Client --------------------------
router.use(URL_CLIENT, express.static(path.join(__dirname, 'build')));
