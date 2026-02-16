---
title: 'Aspire @ .Net Meetup | February 2026'
description: 'Aspire Hands on Demo'
pubDate: 'February 13 2026'
heroImage: '/006-dotnetmeetup-february2026.jpg'
---

### Intro
During the 1(one) hour session, I have presented the followings, which will be covered here as step by step guide with references used:
1. Requirements
2. Creating a new project using aspire cli
3. Integrating Sql Server and writing CRUD for weathereforecast endpoints
4. Integrating Angular instead of using Blazor
5. Integrating Azure Functions to run background jobs
6. Using GitHub Models to enhance data

### Requirements
To run this demo together, you will need dotnet sdk, aspire cli, func cli and angular cli with nodejs installed on your machine. These are easy to install and you can find the instructions on their official websites. 

Below you can see the versions of the tools I have usede during the demo, which are mostly lateest version other than the angular itself. 

```shell
sinannar@Sinans-MacBook-Pro BlogTemp % dotnet --list-sdks
8.0.409 [/usr/local/share/dotnet/sdk]
9.0.300 [/usr/local/share/dotnet/sdk]
9.0.303 [/usr/local/share/dotnet/sdk]
10.0.100 [/usr/local/share/dotnet/sdk]
sinannar@Sinans-MacBook-Pro BlogTemp % dotnet --version
10.0.100
sinannar@Sinans-MacBook-Pro BlogTemp % node --version
v22.15.1
sinannar@Sinans-MacBook-Pro BlogTemp % npm --version
11.8.0
sinannar@Sinans-MacBook-Pro BlogTemp % ng --version
19.2.12
sinannar@Sinans-MacBook-Pro BlogTemp % aspire --version
13.1.0+8a4db1775c3fbae1c602022b636299cb04971fde
sinannar@Sinans-MacBook-Pro BlogTemp % func version
4.5.0
```

### Project Setup
We are going to start using aspire cli to create a new project.
```shell
sinannar@Sinans-MacBook-Pro BlogTemp % aspire new

Select a template:
> Starter App (ASP.NET Core/Blazor)
  Starter App (ASP.NET Core/React)
  Starter App (FastAPI/React)
  Empty AppHost

Enter the project name (BlogTemp): AspireCrud

Enter the output path: (./AspireCrud): ./AspireCrud

Use *.dev.localhost URLs
> No
  Yes

Use Redis Cache
  Yes
> No

Do you want to create a test project?
> No
  Yes
```
Then navigate to the project folder and you will see the following structure, which is pretty much self explanatory. We have a solution file at the root and 4 projects for different purposes.
```shell
sinannar@Sinans-MacBook-Pro BlogTemp % cd AspireCrud
sinannar@Sinans-MacBook-Pro AspireCrud % ls -alrt
total 8
drwxr-xr-x@  3 sinannar  staff    96 13 Feb 21:49 ..
-rw-r--r--@  1 sinannar  staff  2693 13 Feb 21:49 AspireCrud.sln
drwxr-xr-x@  7 sinannar  staff   224 13 Feb 21:49 .
drwxr-xr-x@ 11 sinannar  staff   352 13 Feb 21:49 AspireCrud.Web
drwxr-xr-x@  9 sinannar  staff   288 13 Feb 21:49 AspireCrud.ApiService
drwxr-xr-x@  5 sinannar  staff   160 13 Feb 21:49 AspireCrud.ServiceDefaults
drwxr-xr-x@  8 sinannar  staff   256 13 Feb 21:49 AspireCrud.AppHost
sinannar@Sinans-MacBook-Pro AspireCrud %
```

Before we go further, I want to change current solution file to `slnx`
```shell
sinannar@Sinans-MacBook-Pro AspireCrud % rm AspireCrud.sln
sinannar@Sinans-MacBook-Pro AspireCrud % dotnet new sln -f slnx
The template "Solution File" was created successfully.

sinannar@Sinans-MacBook-Pro AspireCrud % dotnet sln add */*.csproj
Project `AspireCrud.ApiService/AspireCrud.ApiService.csproj` added to the solution.
Project `AspireCrud.ServiceDefaults/AspireCrud.ServiceDefaults.csproj` added to the solution.
Project `AspireCrud.AppHost/AspireCrud.AppHost.csproj` added to the solution.
Project `AspireCrud.Web/AspireCrud.Web.csproj` added to the solution.
Solution /Users/sinannar/source/BlogTemp/AspireCrud/AspireCrud.slnx already contains project AspireCrud.ServiceDefaults/AspireCrud.ServiceDefaults.csproj.
Solution /Users/sinannar/source/BlogTemp/AspireCrud/AspireCrud.slnx already contains project AspireCrud.Web/AspireCrud.Web.csproj.
```
Lets create gitignore file and initialize a git repository.
```shell
sinannar@Sinans-MacBook-Pro AspireCrud % dotnet new gitignore
The template "dotnet gitignore file" was created successfully.

sinannar@Sinans-MacBook-Pro AspireCrud % git init
Initialized empty Git repository in /Users/sinannar/source/BlogTemp/AspireCrud/.git/

sinannar@Sinans-MacBook-Pro AspireCrud % git add .
sinannar@Sinans-MacBook-Pro AspireCrud % git commit -m "init"
```

#### Running the application
Lets go and run the aspire application to see if everything is working fine. We can run the application from the root of the solution and it will automatically find the AppHost project and run it.
```shell
sinannar@Sinans-MacBook-Pro AspireCrud % pwd
/Users/sinannar/source/BlogTemp/AspireCrud
sinannar@Sinans-MacBook-Pro AspireCrud % ls
AspireCrud.ApiService           AspireCrud.slnx
AspireCrud.AppHost              AspireCrud.Web
AspireCrud.ServiceDefaults
sinannar@Sinans-MacBook-Pro AspireCrud % aspire run
🔍 Finding apphosts...
AspireCrud.AppHost/AspireCrud.AppHost.csproj

🗄  Created settings file at '.aspire/settings.json'.

     AppHost:  AspireCrud.AppHost/AspireCrud.AppHost.csproj

   Dashboard:  https://localhost:17042/login?t=ecf82c23a3093940e3513da6bcc4d142

        Logs:  /Users/sinannar/.aspire/cli/logs/apphost-8063-2026-02-16-06-49-23.log

               Press CTRL+C to stop the apphost and exit.
```
Clicking the url will open aspire dashboard on a browser and you can see the apphost is running and we have 2 services running as well, which are `apiservice` and `webfrontend`. These are the default services created by aspire cli and they are running with the default configuration. We will be modifying these services and adding new ones in the next steps.
<img width="650px;" src="/006/ss-01.png">

There is graph view for the resources on dashboard, it can be quite useful when your project grows and you have multiple services and resources. You can easily see the dependencies between them and how they are connected. You can also click on each resource to see more details about it, such as the connection strings, environment variables, logs, etc.
<img width="650px;" src="/006/ss-02.png">

You can see the logs of each service on the dashboard as well, which is pretty useful for debugging and monitoring. This is not limited to your own services, but also includes the logs of the containers you are running as part of your infrastructure, such as sql server, redis, etc. You can see the logs of these containers and services in the same place, which is pretty convenient.
<img width="650px;" src="/006/ss-03.png">

Aspire gives you ability to view traces and metrics locally without setting up any external monitoring tools. You can see the traces and metrics of your services on the dashboard, which is pretty useful for debugging and performance monitoring. 
<img width="650px;" src="/006/ss-04.png">

### Sql Servere and CRUD

### Javascript Integration

### Azure Function Integration

### Github Models Integration

