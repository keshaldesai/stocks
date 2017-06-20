import * as actions from "../actions";

const socketMiddleware = (function() {
  var socket = null;

  const onMessage = (ws, store) => event => {
    const data = JSON.parse(event.data);
    store.dispatch(actions.dataReceived(data));
  };

  return store => next => action => {
    switch (action.type) {
      case "CONNECT":
        if (socket != null) {
          socket.close();
        }
        socket = new WebSocket(action.url);
        socket.onmessage = onMessage(socket, store);
        break;
      default:
        return next(action);
    }
  };
})();

export default socketMiddleware;
