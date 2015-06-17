### Longshot: events-client
Client-side events subscription using Socket.io

#### Installation
`npm install ls-events-client --save`  
or
`jspm install npm:ls-events-client`

#### Usage

The `events-client` API is fluent. See below:

```javascript
// ES6
import events = require("ls-events-client");

//
events
	.setHost("localhost", 10001);
	.start()
	.sub("users", "create", "*", msg => {
		// Subscribe to all user created events
	})
	.sub("users", "update", "carl", msg => {
		// Subscribe to all updates to the user 'carl'
	});
```

#### API

##### setHost
Set the host end-point details
```javascript
function setHost(host: string, port: number): Client;

```

##### start
Connect to the end point
```javascript
function start(): Client;
```
##### subscribe
**N.B.:** `context`, `event`, and `key` can be null or "\*". These both refer to 'all'.

* `Context`: The type of object. E.g. `users`, `invoices`, `orders`, `items`, etc.
* `Event`: The type of event raised. E.g. `create`, `read`, `update`, `delete`, `notify`, etc.
* `Key`: The key of the object.

```javascript
function sub(context?: string, event?: string, key?: string): Client;
```
