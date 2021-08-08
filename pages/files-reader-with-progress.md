# Files reader script with progress report

I needed to scan a large amount of files for specific regexes and I wanted to see the progress while it was scanning, so
I created this files scanner/reader which shows a progress bar while working.

#### package.json

```json
"dependencies": {
  "get-cursor-position": "^1.0.5"
}
```

#### filesreader.js

```javascript
const fs = require('fs');
const getCursorPosition = require('get-cursor-position');

module.exports = (function () {
    class Logger {
        constructor(progressLineLength = 50) {
            this.progressLineLength = progressLineLength;
            console.log(this.getProgressBar(0, progressLineLength));
            console.log('');
            console.log(this.getProgressBar(0, progressLineLength));
            console.log('');

            var pos = getCursorPosition.sync();

            this.firstLine = pos.row - 5;
            this.secondLine = pos.row - 4;
            this.thirdLine = pos.row - 3;
            this.fourthLine = pos.row - 2;
        }

        getProgressBar(fill, nonFill) {
            let result = '[';
            for (let i = 0; i < fill; i++) {
                result += '=';
            }
            for (let i = 0; i < nonFill; i++) {
                result += ' ';
            }
            return result + ']';
        }

        setOverallProgress(percentage, additionalText = '') {
            const numberOfFilled = Math.round(this.progressLineLength * percentage);
            const numberOfEmpty = this.progressLineLength - numberOfFilled;

            this.writeOnLine(this.firstLine, this.getProgressBar(numberOfFilled, numberOfEmpty) + ' ' + additionalText);
        }

        setSubProgress(percentage, additionalText = '') {
            const numberOfFilled = Math.round(this.progressLineLength * percentage);
            const numberOfEmpty = this.progressLineLength - numberOfFilled;

            this.writeOnLine(this.thirdLine, this.getProgressBar(numberOfFilled, numberOfEmpty) + ' ' + additionalText);
        }

        setMainInfoLine(text) {
            this.writeOnLine(this.secondLine, text);
        }

        setSubInfoLine(text) {
            this.writeOnLine(this.fourthLine, text);
        }

        writeOnLine(x, text) {
            const pos = getCursorPosition.sync();

            process.stdout.cursorTo(0, x);
            process.stdout.clearLine();
            process.stdout.write(text);
            process.stdout.cursorTo(pos.col - 1, pos.row - 1);
        }
    }

    const countNumberOfLines = fileName => {
        return new Promise(function (resolve) {
            let nrOfLines = 0;

            const lineReader = require('readline').createInterface({
                input: require('fs').createReadStream(fileName)
            });

            lineReader.on('line', () => {
                nrOfLines++;
            });

            lineReader.on('close', function () {
                resolve(nrOfLines);
            });
        });
    };

    const analyzeFile = (fileName, logger, lineHandler) => {
        return new Promise(async function (resolve) {
            logger.setMainInfoLine(fileName);

            const numberOfLines = await countNumberOfLines(fileName);
            let linesHandled = 0;
            let logProgress = 0;

            const lineReader = require('readline').createInterface({
                input: require('fs').createReadStream(fileName)
            });

            lineReader.on('line', line => {
                lineHandler(line);
                linesHandled++;
                logProgress++;
                if (logProgress > 10000) {
                    logger.setSubProgress(linesHandled / numberOfLines, '' + linesHandled + '/' + numberOfLines);
                    logProgress = 0;
                }
            });

            lineReader.on('close', function () {
                resolve();
            });
        });
    };

    const scanFiles = async (files, lineHandler) => {
        const logger = new Logger();
        let numberOfDoneFiles = 0;

        for (let i = 0; i < files.length; i++) {
            await analyzeFile(files[i], logger, lineHandler);
            numberOfDoneFiles++;
            logger.setOverallProgress(numberOfDoneFiles / files.length, '' + numberOfDoneFiles + '/' + files.length);
        }
    };

    return {
        scanFiles: scanFiles
    };
})();
```

#### Calling it

```javascript
const fs = require('fs');
const scanFiles = require('./filesreader').scanFiles;

// Get the files to analyze
const filesToAnalyse = (() => {
    const FILE_PATTERN = /exampleLog.*/g;
    const NON_FILE_PATTERN = /.gz/g;
    let filesToAnalyse = [];

    fs.readdirSync('./').forEach(file => {
        if (FILE_PATTERN.test(file) && !NON_FILE_PATTERN.test(file)) {
            filesToAnalyse.push(file);
        }
        FILE_PATTERN.lastIndex = 0;
        NON_FILE_PATTERN.lastIndex = 0;
    });

    return filesToAnalyse;
})();

// Results aggregation
const results = {};

(async () => {
    // Line by line execution of all files (synchronous)
    await scanFiles(filesToAnalyse, line => {
        // Handle the line (execute regex, whatever
        // Save results in results array
    });

    // Print results
    console.log(JSON.stringify(results));
})();
```