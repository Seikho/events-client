### Longshot: events-client
Client-side events subscription using Socket.io

#### Installation
`npm install ls-events-client --save`  
or
`jspm install ls-events-client --save`

#### Usage

```javascript
// ES6
import events = require("ls-events-client");
events
	.setHost("localhost", 10001);
	.start()
	.subscribe("notifications", function(msg) {
		// ...
	});
```