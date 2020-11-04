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

## IntelliJ Find in path without test files
```
!*test.java,*.java,!Test*.java
```

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
