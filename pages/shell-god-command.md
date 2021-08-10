# Creating a shell god command
This is a script, that I call a god command, because I use it for all my often-run commands.

run.sh
```shell
PS3='Tell me what to do: '
options=("Option 1" "Option 2" "etc")
select opt in "${options[@]}"
do
    case $opt in
        "Option 1")
            cd ~/Developer/projects/some-project
            mvn clean install -DskipTests -Dmaven.test.skip=true -T 6
            break
            ;;
        "Option 2")
            cd ~/Developer/projects/another-project
            ./scripts/run-script
            break
            ;;
        "etc")
            // You get the point...
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done
```

> I still need to fix the fact that all the option strings have to be duplicated

Don't forget to add this run.sh to the `.bash_profile` file.

```shell
export PATH=$HOME/Developer/bin:$PATH
```
