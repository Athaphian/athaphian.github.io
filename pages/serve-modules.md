# Serving javascript files from node_modules

```js
const express = require('express'),
    app = express(),
    fs = require('fs'),
    packageJson = require("../package.json");


const moduleDependencies = Object.getOwnPropertyNames(packageJson.dependencies)
    .filter(dep => dep.startsWith('@mycompany/prefix'));

app.use('/module/byName', function api(request, response) {
    console.log('[ ] Handling', request.originalUrl);

    console.log('[ ] Finding module:', request.query.name);

    const result = moduleDependencies.find(dep => dep.indexOf(request.query.name) > -1);
    if (result) {
        const absoluteFilePath = require.resolve(result);
        console.log('[ ] Found module:', result, 'in', absoluteFilePath);

        const fileContents = fs.readFileSync(absoluteFilePath);
        response.setHeader('content-type', 'application/javascript');
        response.end(fileContents);
    } else {
        console.log('[X] Module not found (have you added it to package.json?):', request.query.name);
        response.status(404).send("Not Found");
    }
});

app.listen(80);

```