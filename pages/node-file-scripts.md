# Node scripts for files

A collection of scripts to quickly perform various operations on files and their contents.

## Recursively read directory contents into a list

```javascript
var fs = require('fs');

var getFileList = (path) => {
  var fileList = [];

  fs.readdirSync(path).forEach(file => {
    var fullPath = path + '/' + file;
    if (fs.statSync(fullPath).isDirectory()) {
      fileList.push({
        name: file,
        absolutePath: fullPath,
        nrOfSubdirectories: fullPath.split('/').length,
        isDirectory: true,
        fileList: getFileList(fullPath)
      });
    }
    else {
      fileList.push({
        name: file,
        absolutePath: fullPath,
        nrOfSubdirectories: fullPath.split('/').length - 1,
        isDirectory: false
      });
    }
  });

  return fileList;
};
```

Results in objects:
```json
{
  name: 'filename',
  absolutePath: 'dir/dir/to/path/filename',
  nrOfSubDirectories: 4,
  isDirectory: true|false,
  fileList: [
    ...moreOfTheSameObjects
  ]
}
```

## Handle files based on filename pattern matching

Can be used together with the recursive directory walker from above to single out specific files whose
filename matches a regex pattern.

```javascript
var handleFiles = (list, regex, callback) => {
  list.forEach(file => {
    if (file.isDirectory) {
      handleFiles(file.fileList, regex, callback);
    } else if (regex.test(file.name)) {
      callback(file, list);
    }
  });
};
```

Called like this:
```javascript
var fileList = getFileList(rootPath);
handleFiles(fileList, /.*\.spec\.js/, (file, list) => {
  console.log('Specfile found', file);
});
```

## Above two methods combined into a single function
```javascript
var fs = require('fs');

var handleFiles = (list) => {
  return (regex, callback) => {
    list.forEach(file => {
      if (file.isDirectory) {
        handleFiles(file.fileList)(regex, callback);
      } else if (regex.test(file.name)) {
        callback(file, list);
      }
    });
  };
};

var getFileList = (path) => {
  var fileList = [];

  fs.readdirSync(path).forEach(file => {
    var fullPath = path + '/' + file;
    if (fs.statSync(fullPath).isDirectory()) {
      fileList.push({
        name: file,
        absolutePath: fullPath,
        nrOfSubdirectories: fullPath.split('/').length,
        isDirectory: true,
        fileList: getFileList(fullPath)
      });
    }
    else {
      fileList.push({
        name: file,
        absolutePath: fullPath,
        nrOfSubdirectories: fullPath.split('/').length - 1,
        isDirectory: false
      });
    }
  });

  fileList.query = handleFiles(fileList);

  return fileList;
};
```

Can be called like this:
```javascript
getFileList(rootPath).query(/.*\.spec\.js/, (file, list) => {
  console.log('Specfile found', file);
});
```

## Replacing a series of regexes with alternatives
```javascript
  var constructs = [
    [/regex(.*)/g, 'regex.$1'],
    [/regex2(.*)/g, 'regex2.$1']
  ];
  constructs.forEach(construct => {
    data = data.replace(construct[0], construct[1]);
  });
```

## Read files with glob
```
npm install glob
```
```js
const glob = require('glob');

glob('src/js/**/*.js', {}, function (err, files) {
    if (err) throw err;
    files.forEach(fileName => {
        handleFile(fileName);
    });
});
```

## Watch files with gaze
```
npm install gaze
```
```js
const gaze = require('gaze');

gaze(pattern, function(err, watcher) {
    this.on('all', function(event, filepath) {
        console.log(`${filepath} was ${event}'`);
        // Execute code here
    });
});
```
