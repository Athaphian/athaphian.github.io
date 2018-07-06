# Using jetty-runner to serve a frontend and proxy to backend

Jetty-runner can be used to serve a plain directory with static content.
```
java -jar jetty-runner-9.4.9.v20180320.jar --port 3000 --path / client
```
Where 'client' is a directory that contains a static site.

Sometimes it is useful to also serve a proxy on the same host to proxy
calls to a backend process running on a different port. For instance if
we would like to point /api to another server running on port 9000.

This is possible with [jetty-proxy](https://mvnrepository.com/artifact/org.eclipse.jetty/jetty-proxy).

But we have to create the following folder structure:
```
root
 | - client (contains static site)
 | - proxy (contains the proxy context)
   | - WEB-INF
     | - lib
       | - jetty-proxy-9.4.11.v20180605.jar
     | - web.xml
 | - jetty-context-proxy.xml
```

The web.xml inside WEB-INF
```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
         version="3.0">
<servlet> 
  <servlet-name>proxy</servlet-name>
    <servlet-class>org.eclipse.jetty.proxy.ProxyServlet$Transparent</servlet-class>
    <init-param>
      <param-name>proxyTo</param-name>
      <param-value>http://localhost:9000/api</param-value>
    </init-param>
    <init-param>
      <param-name>prefix</param-name>
      <param-value>/</param-value>
    </init-param>
    <async-supported>true</async-supported>
  </servlet>
   
  <servlet-mapping>
    <servlet-name>proxy</servlet-name>
    <url-pattern>/*</url-pattern>
  </servlet-mapping>
</web-app>
```
> Note the backend api is running on localhost:9000/api

The jetty-context-proxy.xml
```
<!DOCTYPE Configure PUBLIC "-//Jetty//Configure//EN" "http://www.eclipse.org/jetty/configure.dtd">
<Configure class="org.eclipse.jetty.webapp.WebAppContext">
  <Set name="serverClasses">
    <Array type="java.lang.String">
      <Item>org.eclipse.jetty.proxy.ProxyServlet$Transparent</Item>
    </Array>
  </Set>
  <Set name="contextPath">/api</Set>
  <Set name="resourceBase">proxy</Set>
</Configure>
```
> Note we are serving the proxy context on /api. Jetty can only serve one context
per path, so for every route, a new proxy context needs to be created.

Running the whole thing
```
java -jar jetty-runner-9.4.9.v20180320.jar --port 3000 jetty-context-proxy.xml --path / client
```

By the way. Jetty can also just serve the contents of a zip file.
```
java -jar jetty-runner-9.4.9.v20180320.jar --port 3000 jetty-context-proxy.xml --path / client.zip
```
