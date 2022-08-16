# Node run command

A simple script to run a command on the commandline in a new child process with
colored terminal output.

```js
const { spawn } = require("child_process");

const executeCommand = function(command) {
    const cmd = command.split(' ').splice(0, 1)[0],
        args = command.split(' ').splice(1),
        ls = spawn(cmd, args);

    ls.stdout.on("data", data => { console.log('\x1b[36m%s\x1b[0m', data) });
    ls.stderr.on("data", data => { console.log('\x1b[31m%s\x1b[0m', data) });
    ls.on('error', (error) => { console.log(`[Watcher] Error during execution: ${error.message}`) });
    ls.on("close", code => { console.log('[Watcher] Execution complete') });
}

executeCommand('npm run build');
```
