# Node scripts for files

A collection of scripts to quickly perform various operations on files.

## Recursively read directory contents into a list

```javascript
var fs = require('fs');

var getFileList = (path) => {
  var fileList = [];

  fs.readdirSync(path).forEach(file => {
    if (fs.statSync(path + '/' + file).isDirectory()) {
      fileList.push({
        name: file,
        absolutePath: path + '/' + file,
        isDirectory: true,
        fileList: getFileList(path + '/' + file)
      });
    }
    else {
      fileList.push({
        name: file,
        absolutePath: path + '/' + file,
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
