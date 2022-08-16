# Name sass files
A simple script to add the filename to the top of all the scss files so that when they are all combined, it is easier
to debug which file is included when. Of course this can be used for other purposes as well.

```js
const fs = require("fs");

module.exports = (function() {
    const handleFiles = (list) => {
        // See node file scripts for implementation
    };

    const getFileList = (path) => {
        // See node file scripts for implementation
    };

    const prepend = function(filePath, string) {
        const data = fs.readFileSync(filePath).toString().split("\n");
        data.splice(0, 0, string);
        const text = data.join("\n");

        fs.writeFile(filePath, text, function (err) {
            if (err) return err;
        });
    }

    return {
        'handleFiles': handleFiles,
        'getFileList': getFileList,
        'prepend': prepend
    };
}());
```

```js
const {getFileList, prepend} = require('./utils.js');

getFileList('src/scss').query(/.*\.scss/, (file, list) => {
    prepend(file.absolutePath, `/* ${file.absolutePath} */\n`);
});
```