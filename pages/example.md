# Forward Planning

## Purpose

We motivate existing and future Private Banking customers in a unique and innovative way to have an open dialog with us about their financial situation, where their wishes and goals play a central role.

Together with the customer we will calculate the chance of success of their goals and together we will make improvements to improve the chance of this success.

## Cloning

Clone the repo from ssh://git@gitlab.ing.net:2222/Securities/forward-planning.git

    git clone ssh://git@gitlab.ing.net:2222/Securities/forward-planning.git
    cd forward-planning

## Dependencies

- `java == 1.8` 
- `maven >= 3.3`
- `node >= 4`
- `yarn >= 1.3.2`

## Building the project

To build the project a simple Maven command can be run:

    mvn clean install

## Running the application locally

To run the application, you'll need to start the following components:

 * A mock server that sets up a local database and mock APIs for external services
 * The application's backend API which also hosts a minified front-end
 * A frontend server for running the application's client code in a dev-friendly unminified mode. 
   Gulp also proxies api requests to another proxy in mock which acts as a Stargate mock for authentication.

### Running the mock server

    cd mock
    mvn -Prun-server jetty:run

This command will start a server that initializes a database schema structure and mocks for several external APIs. 
  
### Running the backend server

    cd web
    mvn -Pbuild-server -Prun-server jetty:run

This command will start the application using configuration from api/appconfig/buildserver/. 
The following paths are exposed:

- http://localhost:9000/api

#### Running the backend server for local development with hot reloading of code

An even better method of starting the backend server is using IntellIJ's tomcat plugin. This allows
you to run code changes quicker. To to this, take the following steps
 
 - Download and extract the latest Tomcat 8 .tar.gz from http://tomcat.apache.org/ on your workstation
 - Copy the contents (properties, keystores and logback.xml) from web/appconfig/buildserver to your Tomcat 8's /lib directory. If necessary, make changes in this copy to suit your environment (such as proxy settings).
 - Install IntellIJ's tomcat plugin
 - In IntellIJ, create a new Local Tomcat run configuration for the Mock server:
    - Point the run configuration to your locally extracted Tomcat 8 directory
    - VM options: ```-Xmx2048m```
    - Port: 9001
    - Jmx port: 1098
    - In the deployment tab, select the exploded .war artifacts from ```mock```.
    - Set the application context of ```mock``` to ```/mock```
    - In the logs tab, add entries for the app.log and httpclient.log files. Note that these are written in: ```<your-user-dir>/.IntelliJIdea15/system/tomcat/<tomcat configuration name>/logs/```
    - Click OK.
 - Create another Tomcat instance with the same settings for the Web server with these changes:
    - Port: 9000
    - In the deployment tab, select the exploded .war artifacts from ```web```.
    - Set the application context of ```web``` to ```/```
    - Jmx port: 1099
    - In the logs tab, add entries for the app.log and httpclient.log files. Note that these are written in: ```<your-user-dir>/.IntelliJIdea15/system/tomcat/<tomcat configuration name>/logs/```
 - (Optionally) Create an IntelliJ multirun (is a plugin) configuration which starts Mock and Web. Use option ```Start configurations one by one```
    
Now you can start a tomcat instances from IntellIJ. After you updated some code from either web, service-api or service-impl, click the 'update application' button
in the tomcat view. After clicking this button, IntellIJ asks how to update the application. 
If you've started the tomcat runner in debug mode, ```Update classes and resources``` is usually enough. Otherwise, use ```Redepoy```. 
 
### Running the frontend server
To run the frontend server through yarn, you can run the command:

    cd client
    yarn start

Which will expose the following paths:

- http://localhost:3000/
- http://localhost:3001/

The first will be the frontend application, the latter is the BrowserSync control panel. This server hosts unminified frontend files
for development purposes. All API requests are forwarded to localhost:9000, which should be a running foward-planning backend instance.

> NOTE: If you encounter the following error 'An invalid domain was specified for this cookie', you
will have to add the following line to the tomcat context.xml file:

    <CookieProcessor className="org.apache.tomcat.util.http.LegacyCookieProcessor" />

## Jenkins build

Forward Planning has several Jenkins build processes, the main ones being:

1. https://lrv142hf.europe.intranet:8080/job/forward-planning-master-build/ Master build that triggers the parameterized build for branch master
2. https://lrv142hf.europe.intranet:8080/job/forward-planning-parameterized-build/ This build runs the sonarRunner 
  task to feed sonar all quality info for the given branch. After that it runs the e2e tests for the given branch 
3. https://lrv142hf.europe.intranet:8080/job/forward-planning-master-snapshot-deploy-o/ Builds the latest master code to a SNAPSHOT WAR, publishes 
  it on Nexus and deploys it to the Dev environment 

## Configuring H2 database in IntelliJ
- Use a new remote H2 datasource
- Use this url: jdbc:h2:tcp://localhost:8999/mem:instruments;AUTO_RECONNECT=TRUE
- If this doesn't work check that the driver version matches the version of h2 in pom.xml api (compile 'com.h2database:h2:1.4.187')
  Example: find / -name "h2-1.4.187.jar" and use this jar as the driver 

## Application configuration
The application is deployed without any information in regards to the environment. It requires an application.properties file in order to run.
An example of this file is located in /web/appconfig/buildserver. This file is for instance used when starting the application using mvn jetty:run. 

When the application is deployed on one of the OTAP environments, a separate deployment configuration artifact is used. For more information, see
the [forward-planning-deployment](https://lrv142hf.europe.intranet:8990/projects/SEC/repos/forward-planning-deployment/browse) repository.

## Testing, debugging, etc

For information about testing, debugging, etc. see the `readme.md` files in the respective subprojects' directory.

## Stargate
Forward planning uses Stargate for user authentication.
All api calls (not static content) will pass thru the ApiTrustFilter which reads certain request headers and can 
determine if the user is authenticated, see the [stargate](https://confluence.europe.intranet/display/HIG/Stargate+cookbook%3A+how+to+start+with+using+the+Stargate) wiki.
For now this filter can be disabled by setting byPassAuthFilter=true in application.properties (TODO remove this option when Stargate is working on DEV,TST,... environments)

When the user is not authenticated an Angular httpInterceptor redirects the user to the stargate login page.

### Stargate mock during local deployment
A proxy in gulp (proxy.js) redirects calls to /api/... to the MockStargateServlet (/mock/stargate) which acts as a proxy to the actual apis in Web.
The MockStargateServlet adds certain headers to the request to mock a logged in user.
During e2e tests the MockStargateServlet can be disabled by MockStargateToggleResource to simulate an unauthorized user. 

## Releasen
Het releasen van het project loopt volgens het [Releasplan](https://confluence.europe.intranet/display/FPL/Releaseplan)

## Bean validation
All data that is sent to the REST-endpoints must be validated with bean validation (JSR-303).
We do this by adding a @Valid annotation to the method parameters. Example:
 
```
@ApiParam(value = "Salaries to apply to plan", required = true) @Valid SalariesResult salaries) { ... }
```

### Retrieving data to be used with validation
Sometimes you need addional data (mostly from the database) to validate certain boundaries. For instance is a certain
date after the horizonDate. To accomodate this the forwardPlanUUID is saved in a threadlocal. You can also inject a service in the 
validation class to use this uuid to get additional info. Example:

```
@Inject private ValidationService validationService;
String uuid = ValidationUUIDContextThreadLocal.get().getForwardPlanUUID();
LocalDate horizonDate = validationService.getHorizonDate(uuid);
```

### Normal error messages
A normal error message generated by the validation class DateInputConstraintCheck can be translated by a label in nl.json named
error.DateInputConstraint

### Custom error messages 
If you want to programatically create an error message <strong>always</strong> use the ValidationHelper.
For more info how to build custom messages please refer to this class.
