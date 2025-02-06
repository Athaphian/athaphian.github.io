# Nginx tips 'n tricks

These configuration options are based on the following docker image:
```
  nginx:
    image: nginx:1-alpine
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro,z
      - ./nginx/conf.d:/etc/nginx/conf.d:ro,z
    ports:
      - "80:80"
```

## Substitutions
To map for example query parameters
```
server {
  listen 80;

  sub_filter_once off;

  # Find and map id query parameter
  if ($request_uri ~* id=([0-9]+)) {
    set $id "$1";
  }
  
  # Find and map some navigation
  if ($request_uri ~* (forums|shop|contact)) {
    set $navigation "$1";
    set $filename "/${navigation}.json";
  }
  
  # Serve files based on path or query parameter
  location /navigation/json {
    root /some/path;
    default_type application/json;
    sub_filter_types application/json;
    try_files $filename =404; # open the file if it exists, else 404
    sub_filter "%ID%" $id; # replace %ID% with the value of $id in the response
  }

  # Proxy
  location /api {
      proxy_set_header 'X-Specific-Header' value; # example of a custom header
      include /includes/include.conf; # example of an include file
      proxy_pass http://host.docker.internal:8080/api; # redirect to localhost:8080
  }
}
```

Another example:
```
  # Find a specific javascript file in node_modules based on a query parameter
  if ($request_uri ~* javascript\?tag=filename-(.+)) {
    set $modulename "$1";
    set $javascriptPath "/some-prefix-${modulename}/dist/${modulename}.min.js";
  }

  # Serve javascript files from node_modules
  location /url/to/javascript {
    root /node_modules;
    default_type application/javascript;
    try_files $javascriptPath =404;
  }
```