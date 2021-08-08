# Searching for a regex in all files in directory

```javascript
var fs = require('fs'),
    path = require('path'),

    resultList = [],

    regex = /\$[a-zA-Z0-9-]*/g,
    handleMatch = function (match) {
        var found = false,
            i;

        for (i = 0; i < resultList.length; i++) {
            if (resultList[i][0] === match) {
                resultList[i][1]++;
                found = true;
                break;
            }
        }

        if (!found) {
            resultList.push([match, 1]);
        }
    },

    done = function () {
        console.log(resultList);

        var totals = 0;
        for (var i = 0; i < resultList.length; i++) {
            totals += resultList[i][1];
        }

        console.log('Total number of string usages:', totals);

        console.log('Single usage:');
        for (var i = 0; i < resultList.length; i++) {
            if (resultList[i][1] < 2) {
                console.log(resultList[i]);
            }
        }
    },

    walk = function (dir, done) {
        var results = [],
            pending;

        fs.readdir(dir, function (err, list) {
            if (err) {
                return done(err);
            }

            pending = list.length;

            if (!pending) {
                return done(null, results);
            }

            list.forEach(function (file) {
                file = path.resolve(dir, file);
                fs.stat(file, function (err, stat) {
                    if (stat && stat.isDirectory()) {
                        walk(file, function (err, res) {
                            results = results.concat(res);
                            if (!--pending) {
                                done(null, results);
                            }
                        });
                    } else {
                        results.push(file);
                        if (!--pending) {
                            done(null, results);
                        }
                    }
                });
            });
        });
    },

    handleLine = function (line) {
        var result = line.match(regex);

        if (result !== null && result.length > 0) {
            result.forEach(function (match) {
                handleMatch(match);
            });
        }
    },

    numberOfHandlers = 0,

    addHandler = function () {
        numberOfHandlers++;
    },

    removeHandler = function () {
        numberOfHandlers--;
        if (numberOfHandlers === 0) {
            done();
        }
    };

walk('sass', function (error, list) {
    list.forEach(function (item) {
        var lineReader = require('readline').createInterface({
            'input': require('fs').createReadStream(item)
        });

        addHandler();

        lineReader.on('line', function (line) {
            handleLine(line);
        });

        lineReader.on('close', function () {
            removeHandler();
        });
    });
});
```