# NodeJS reading csv files

These short code snippets can be used to read csv files in a specified directory directly to javascript objects.

### Reading a single csv file
This will read a single csv file into a javascript object array. The first line of the csv file
is used to determine the headers of the columns.
```
const fs = require('fs');

const csvToJson = fileName => new Promise(resolve => fs.readFile(fileName, 'utf8', (err, contents) => {
  const stringList = contents.trim().split(/\r?\n/g),
    headers = stringList.splice(0, 1)[0].slice(1, -1).split('","'),
    result = stringList.map(row => row.slice(1, -1).split('","')
      .reduce((prev, curr, idx) => Object.assign(prev, { [headers[idx]]: curr }), {}));

  resolve(result);
}));
```

### Reading an entire directory
This will read all .csv files from a directory into the same javascript object array.
For the best results, use .csv files with the same named columns. This is however not mandatory.
```
const csvDirectoryToJsonList = (directory) => new Promise(resolve => fs.readdir(directory, (err, files) => Promise.all(
  files.filter(f => f.endsWith('.csv')).map(f => csvToJson(f))
).then(result => resolve(result.flat()))));
```

### Testing
Short code snippet to demonstrate above two methods.
```
async function tst() {
  const records = await csvDirectoryToJsonList('./');
  console.log(records.length);
  console.log(records[0]);
}

tst();
```

## Another script
This time without the splicing. Assuming that the csv does not contain quotes around every value.
Also with a customizable delimiter.
```
const fs = require('fs');

const csvToJson = (fileName, delimiter) => new Promise(resolve => fs.readFile(fileName, 'utf8', (err, contents) => {
  const stringList = contents.trim().split(/\r?\n/g),
    headers = stringList.splice(0, 1)[0].split(delimiter),
    result = stringList.map(row => row.split(delimiter).reduce((prev, curr, idx) => Object.assign(prev, { [headers[idx]]: curr }), {}));
  resolve(result);
}));

csvToJson("input1.csv", ";").then(result => {
    console.log(result[0]);
});
```
