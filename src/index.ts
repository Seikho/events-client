import io = require("socket.io-client");
var cfg = require("ls-config");
export = api;

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

function setHost(hostName: string, port?: number) {
	socketHost = "http://" + hostName + (port?port:80);
	return api;
}

function connect() {
	var socket = io(socketHost);
	return socket;
}

function subscribe(context: string, event: string, key: string, callback: (channel: string, message: string) => void) {
	var socket: SocketIOClient.Socket = cfg.config("socket");
	
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
