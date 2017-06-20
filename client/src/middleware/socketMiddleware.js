import * as actions from "../actions";

const socketMiddleware = (function() {
  var socket = null;

  const onOpen = (ws, store) => evt => {
    //Send a handshake, or authenticate with remote end
    console.log("Connected to server");
  };

  const onClose = (ws, store) => evt => {
    console.log("Disconnected to server");
  };

  const onMessage = (ws, store) => evt => {
    //Parse the JSON message received on the websocket
    const data = JSON.parse(evt.data);
    store.dispatch(actions.dataReceived(data));
  };

  return store => next => action => {
    switch (action.type) {
      //The user wants us to connect
      case "CONNECT":
        //Start a new connection to the server
        if (socket != null) {
          socket.close();
        }

        //Attempt to connect (we could send a 'failed' action on error)
        socket = new WebSocket(action.url);
        socket.onmessage = onMessage(socket, store);
        socket.onclose = onClose(socket, store);
        socket.onopen = onOpen(socket, store);

        break;

      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  };
})();

export default socketMiddleware;
