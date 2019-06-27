

//==============================================================================

//-- Dependencies --------------------------------
const express = require('express');
const path = require('path');
const chat = require('./chat.js');

//-- Project Constants ---------------------------
const URL_CLIENT = '/';
const URL_CHAT = '/';
const PATH_BUILD = 'build';

//-- Configure & Export Router -------------------
const router = module.exports = express.Router();

//-- Handle Chat (via websockets) ----------------
router.ws(URL_CHAT, function(webSocket, request) {
    const user = request.auth;
    if (!user) { return;}
    chat.clientAdd(user.id, user.username, webSocket);
});

//-- Serve React Client --------------------------
router.use(URL_CLIENT, express.static(path.join(__dirname, PATH_BUILD)));
