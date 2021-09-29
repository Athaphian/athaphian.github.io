# Some random Docker notes

### Docker proxy settings
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

### Environment variables
Can be specified in string format:
```
  some-gateway:
    container_name: some-gateway
    image: some-gateway
    environment:
      - "JAVA_OPTS=-Xmx128m -Xms64m -Dproxy.targetUri=http://host.docker.internal:9024"
    ports:
      - 8000:8000
```
But also in array:
```
  some-gateway:
    container_name: some-gateway
    image: some-gateway
    environment:
      JAVA_OPTS: >
        -Xms64m
        -Xmx128m
        -Dproxy.target-uri=http://host.docker.internal:9024
    ports:
      - 8000:8000
```

### Mounting local files
```
  some-gateway:
    container_name: some-gateway
    image: some-gateway
    ports:
      - 8000:8000
    volumes:
      - ~/Developer/test-files/keystore.jks:/workspace/keystore.jks
      - ~/Developer/test-files/keystore.properties:/workspace/keystore.properties
```

### Setting up NGINX
```
  nginx-proxy:
    image: nginx:alpine
    container_name: nginx-proxy
    ports:
      - 8000:8000
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/log:/var/log/nginx
    environment:
      TZ: ${TZ}
```
And in the `/nginx/nginx.conf`:
```
events { worker_connections 1024; }

worker_processes 1;

http {

    sendfile on;

    log_format upstream_logging '[$time_local] $remote_addr$request_uri to: $upstream_addr: $request  <-- status $upstream_status response_time $upstream_response_time msec $msec request_time $request_time';
    gzip on;
    access_log /var/log/nginx/access.log upstream_logging;
    proxy_set_header X-Requested-By local-test-service;
    ignore_invalid_headers off;
    proxy_pass_request_headers on;

    server {
        listen 8000;

        location / {
            proxy_pass https://some.external.url/destination/;
        }
    }
}
```
