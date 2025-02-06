# Creating a shell god command
This is a script, that I call a god command, because I use it for all my often-run commands.

run.sh
```shell
PS3='Tell me what to do: '
options=("Option 1"
         "Option 2"
         "etc")
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

## Make a subselection
This option can be added to the god script to import a chosen sql file into mysql.
```
all_sql_scripts=()
for entry in "/path/to/database_dumps"/*.sql
do
    my_name="$(basename -s .sql $entry)"
    all_sql_scripts+=($my_name)
done
echo "----"
PS3='Select sql script : '
select chosen_script in "${all_sql_scripts[@]}"
do
    full_url="/path/to/database_dumps/$chosen_script.sql"
    echo "Importing SQL, please wait..."
    mysql -u root  db_name < $full_url
    break
done
break
;;
```

## Ask for input
This option can be added to the god script to ask the user for one line of input.
```
echo Name of the dump:
read sqlscriptname
mysqldump -u root --no-tablespaces presdb > /path/to/database_dumps/$sqlscriptname.sql
break
;;
```
