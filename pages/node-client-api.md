# Using Node, connect to serve a client and an api

This is a very basic and simple script to use connect to serve both an api endpoint and
a client web app.

Nothing fancy. Just here so I can easily copy/paste it when I need it.

```javascript
'use strict';

var connect = require('connect'),
	serveStatic = require('serve-static'),
	app = connect();

app.use('/api', function api(req, res) {
	console.log('api call');
	res.end('api call');
});
app.use('/', serveStatic('app/', {'index': ['index.html', 'index.htm']}));

app.listen(8081);
```
