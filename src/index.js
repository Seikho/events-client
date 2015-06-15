var io = require("socket.io-client");
var cfg = require("ls-config");
var api = {
    sub: subscribe,
    setHost: setHost,
    start: start
};
// Default URL 
var socketHost = "http://localhost";
function start() {
    cfg.config("io", connect());
    return api;
}
function setHost(hostName, port) {
    socketHost = "http://" + hostName + (port ? port : 80);
    return api;
}
function connect() {
    var socket = io(socketHost);
    return socket;
}
function subscribe(context, event, key, callback) {
    var socket = cfg.config("socket");
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
    socket.emit("subscribe", JSON.stringify(opts));
    socket.on(subChannel, callback);
    return api;
}
module.exports = api;
