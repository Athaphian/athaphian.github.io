# Some random notes
Some random notes that I like to keep here.

## OSX message popup
How to display a popup notification in OSX on the top right of the screen, from the command line.
```
osascript -e 'display notification "Lorem ipsum dolor sit amet" with title "Title"'
```

## IntelliJ key shortcuts
Some IntelliJ key shortcuts that I find useful, but can not seem to remember.

| Action            | Key binding       |
|-------------------|-------------------|
| Focus Terminal    | CTRL+TAB+T        |
| Run Test          | CTRL+SHIFT+F10    |
| Debug             | F9                |
| Continue debug    | F9                |
| Close tool window | SHIFT+ESC         |
| Close tab         | CMD+F4            |
| Add breakpoint    | CMD+F8            |

## GIT release notes generation
In the case of using feature branches, this simple snippet can be used to generate release notes.
```
git --no-pager log --pretty=format:"%ad%x09%s [%an]" -n200 | grep "Merge branch .* into 'master'" | awk '{print $1,$2,$3,$4,$5,$9}'
```

## VS Code not updating on Mac OSX
```
sudo chown -R $USER ~/Library/Caches/com.microsoft.VSCode.ShipIt
xattr -dr com.apple.quarantine /Applications/Visual\ Studio\ Code.app
```

## Spring cloud contract examples
[https://github.com/spring-cloud-samples/spring-cloud-contract-samples](https://github.com/spring-cloud-samples/spring-cloud-contract-samples)

## Cypress download links
https://download.cypress.io/desktop/3.0.2?platform=darwin&arch=x64 <-- mac
https://download.cypress.io/desktop/3.1.0?platform=linux64 <-- linux

## Cypress shadow dom hell
[https://github.com/cypress-io/cypress/issues/144](https://github.com/cypress-io/cypress/issues/144)

## Add certificate to java keystore
Add a certificate to both java itself and IntelliJ runtime.
```
sudo keytool -import -trustcacerts -keystore /Library/Java/JavaVirtualMachines/jdk1.8.0_181.jdk/Contents/Home/jre/lib/security/cacerts -alias 'ALIAS' -file ~/Documents/certificates/root_b64.cer

sudo keytool -import -trustcacerts -keystore "/Applications/IntelliJ IDEA.app/Contents/jdk/Contents/Home/jre/lib/security/cacerts" -alias 'ALIAS' -file ~/Documents/certificates/root_b64.cer
```

## NGINX add parameter based on header
When using NGINX proxy, this can be used to change a header to a parameter
```
set $delimeter "";

if ($is_args) {
  set $delimeter "&";
}

set $entity $http_x_business_entity;

set $args "$args${delimeter}entity=${entity}";
```

## IntelliJ Find in path without searching in test files
```
!*test.java,*.java,!Test*.java
```

## IntelliJ Find in path without searching in spec or bundles
```
!*spec.js,*.js,!*bundle.js
```

## OSX check which process is using a port
```
sudo lsof -nP -iTCP:8888 | grep LISTEN
```

## My preferred OSX terminal colors (yellow)
```
text: 266 266 0
background: 30 30 0: opacity 92%, blur 0%
```

## Base64 encode a string
```
node -e "require('readline') .createInterface({input:process.stdin,output:process.stdout,historySize:0}) .question('PAT> ',p => { b64=Buffer.from(p.trim()).toString('base64');console.log(b64);process.exit(); })"
```

## My Law of Inverse Priority to Bug Retention Time
The longer a bug is present in a system, the less important it becomes to fix it.

## Arch Linux Docker
```
FROM archlinux/base:latest
RUN apt-get update && apt-get install -y curl
```

## Reading excel files in NodeJS
```javascript
const readXlsxFile = require('read-excel-file/node');

readXlsxFile('file.xlsx').then((rows) => {
  // `rows` is an array of rows
  // each row being an array of cells.

  console.log(rows);
});
```

```json
  "dependencies": {
    "read-excel-file": "^5.1.0"
  }
```

## Docker proxy settings
When using a proxy on localhost, say on port `3128`, two things need to happen:
1. Docker daemon needs to be able to access the internet.
2. The docker containers need to be able to access the internet.

The fist can be fixed by opening docker desktop preferences, resources, proxies and entering `http://127.0.0.1:3128` for both http and https proxy. Don't forget to add `localhost` to bypass.

The second can be fixed by adding the following snippet into `~/.docker/config.json`:
```json
{
  "proxies": {
    "default": {
      "httpProxy": "http://host.docker.internal:3128",
      "httpsProxy": "http://host.docker.internal:3128",
      "noProxy": "localhost"
    }
  }
}
```