##### Checkout from server
```
git clone <repo-namne>
```
##### Commit
```
git commit -m "Some message"
```
##### Push
```
git push origin master
```
##### Pull
```
git pull origin master
```
##### Initialize (local)
```
git init
```
##### Initialize bare (on server)
```
git --bare init
```
##### Revert all local commits back to staging, ready for commit
```
git reset --soft HEAD^
```
##### Show all files that are ignored
```
git ls-files --others -i --exclude-standard
```
##### Add all files also removed
```
git add -u
```
##### Undo an git add
```
git reset HEAD <file>
```
##### Re-attach to origin on different location
```
git remote set-url origin ssh://user@server/path/path
git push origin master
```
##### Remove all local-only tags
```
git tag -l | xargs git tag -d
git fetch --tags
```