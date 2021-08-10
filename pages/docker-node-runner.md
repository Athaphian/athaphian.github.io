# Simple Docker image that runs node
This is a description for the creation of a simple Docker image that can run a node js app from the command line.

Dockerfile
```
FROM alpine
RUN apk add --update nodejs
```

test.js
```javascript
console.log('It is started!, Hello world!');
```

run.sh
```shell
docker run -ti -v $(pwd):/src -p 8888:8888 --rm bc92dec45bba node /src/test.js
```

> Of course the image name needs to be changed

> Opening the port in this example is not required, but it is here for demonstrational purposes.

## Packaging the app
To package an app (and in this example use a different docker base).

Dockerfile
```
FROM node:12-slim
WORKDIR /app
COPY . /app
EXPOSE 80
CMD ["node", "app.js"]
```

app.js
```javascript
const express = require('express')
const app = express()
const port = 80

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

package.json (for express)
```json
{
  "name": "docker-test",
  "version": "1.0.0",
  "description": "",
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```
