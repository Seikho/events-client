import io = require("socket.io-client");

export = api;

var api = {
	sub: subscribe,
	setHost: setHost,
	start: start
};

var socketClient: SocketIOClient.Socket;

// Default URL 
var socketHost = "http://localhost";

function start() {
	connect();
	return api;
}

function setHost(hostName: string, port?: number) {
	socketHost = "http://" + hostName + (port?port:80);
	return api;
}

function connect() {
	socketClient = io(socketHost);
}

function subscribe(context: string, event: string, key: string, callback: (channel: string, message: string) => void) {

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
