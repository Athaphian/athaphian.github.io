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

##### GIT create empty commit
```
git commit --allow-empty
```

#### Squash commits into a single commit
```
git rebase -i HEAD~3
```
> Where 3 is the number of commits you want to squash.
> Then, if already pushed to master, use force push to rewrite the commit list

### GIT release notes generation (changelog)
This will work when working with feature branches which are merged to master. It will list all
merges to master.
```
git --no-pager log --pretty=format:"%ad%x09%s [%an]" -n200 | grep "Merge branch .* into 'master'"
```
This will generate a table that can be copy/pasted directly to confluence:
```
echo "||Date||Description||Owner||" && git --no-pager log --pretty=format:"|%ad|%s|%an|" -n200 | grep "Merged PR"
```
