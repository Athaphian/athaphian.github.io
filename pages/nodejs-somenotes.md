## Unique years
Get a list of unique years from a list of objects that contain a date.

```js
var list = [{
  date: '20160520'
}, {
  date: '20160520'
}, {
  date: '20190520'
}, {
  date: '20140520'
}];

function getUniqueYears(list, field) {
  return list
    .map(elm => elm[field].substring(0,4))
    .filter((el, i, arr) => arr.indexOf(el) === i)
    .sort()
    .reverse();
};

console.log(getUniqueYears(list, 'date'));
```

## Very simple electron app

package.json
```json
{
  "name": "electron-test",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "dependencies": {
    "electron": "^5.0.1",
    "express": "^4.17.0"
  }
}
```

main.js
```js
// Serving statics
const express = require('express');
const expressApp = express();
const port = 3000;

expressApp.use(express.static('./'));
expressApp.listen(port);

const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
```

backend.js
```js
exports.testCall = () => {
  return "answer";
}
```

index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.

    <script>
    
      const { remote } = require('electron');
      const mainProcess = remote.require('./backend.js');
      console.log(mainProcess.testCall());
    
    </script>
  </body>
</html>
```

## Converting csv file to json
```js
const fs = require('fs');

fs.readFile('csv.csv', 'utf8', function(err, contents) {
  const stringList = contents.trim().split(/\r?\n/g),
    headers = stringList.splice(0, 1)[0].slice(1, -1).split('","'),
    result = stringList.map(row => row.slice(1, -1).split('","')
      .reduce((prev, curr, idx) => Object.assign(prev, {[headers[idx]]: curr}), {}));

  console.log(JSON.stringify(result));
});
```
