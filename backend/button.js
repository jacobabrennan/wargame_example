

/*== Red Button ================================================================

*/

//-- Project Constants ---------------------------
const SOCKET_ERROR   = 'error';
const SOCKET_MESSAGE = 'message';
const SOCKET_CLOSE   = 'close';

//-- Scaffolding ---------------------------------
const button = module.exports = {
    pressed: false,
    watchUser(userId, webSocket) {
        webSocket.on(SOCKET_MESSAGE, (data) => {
            data = JSON.parse(data);
            const action = data.button;
            if (action) {
                console.log(action);
            }
        })
    },
};
