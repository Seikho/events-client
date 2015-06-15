var io = require("socket.io-client");

var socketClient = null;

// Default URL
var socketHost = "http://localhost";

function start() {
    connect();
    return api;
}

function setHost(hostName, port) {
    socketHost = "http://" + hostName + ":" + (port ? port : 80);
    return api;
}

function connect() {
    socketClient = io(socketHost);
}

function subscribe(context, event, key, callback) {
    var subChannel = [
        (context ? context : "*"),
        (event ? event : "*"),
        (key ? key : "*")
    ].join("/");

    var authToken = "someToken"; // use jwt here
    var opts = {
        channel: subChannel,
        token: authToken
    };

    socketClient.emit("subscribe", JSON.stringify(opts));
    socketClient.on(subChannel, callback);
    return api;
}

var api = {
    sub: subscribe,
    setHost: setHost,
    start: start
};
