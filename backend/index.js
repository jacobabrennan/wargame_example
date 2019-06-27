

//== Test Wargame Module =======================================================

//-- Dependencies --------------------------------
const express = require('express');
const path = require('path');
const connectionManager = require('./connection_manager.js');
const chat = require('./chat.js');
const button = require('./button.js');

//-- Project Constants ---------------------------
const URL_CLIENT = '/';
const PATH_BUILD = 'build';

//-- Configure & Export Router -------------------
const router = module.exports = express.Router();

//-- Attach Client (via websockets) --------------
router.ws(URL_CLIENT, function (webSocket, request) {
    // Ensure user info is present on request (user logged in)
    const user = request.auth;
    if (!user) { return;}
    // Create websocket connection
    const clientNew = connectionManager.clientAdd(
        user.id, user.username, webSocket,
    );
    // Attach sub-modules
    chat.configureClient(clientNew)
    button.configureClient(clientNew);
});

//-- Serve React Client --------------------------
router.use(URL_CLIENT, express.static(path.join(__dirname, PATH_BUILD)));
