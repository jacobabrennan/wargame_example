

/*== Test Wargame Module =======================================================

This is the server backend for the RedButton test wargame. It must be included
in the "/current" directory of the Social Media Wargames server in order to run.
Also, the "build" directory must also be copied to "/current" in order to serve
the react front end.

This module serves a simple chat client with a big red button, and handles
WebSockets communications between those clients.

*/

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
