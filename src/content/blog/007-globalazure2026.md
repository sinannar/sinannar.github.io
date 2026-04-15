---
title: 'Aspire with AI(MCP)'
description: ''
pubDate: 'April 15 2026'
heroImage: '/007-globalazure-aspirewithai.jpeg'
---

### Intro
In this blog post, we will create an API project with dotnet to consume github models to create agent. This agent will use MCP toolkit we will be creating as part of the workflow. We will use Aspire to orchestrate the solution and use dashboard to monitor GenAI logs.

### Setup

#### Verifying Requirements
To follow this tutorial, you will need aspire cli as well as dotnet sdk installed. You can verify the requirements by running the following commands in your terminal:
```bash
$ dotnet --version
10.0.100
$ aspire --version
13.2.2+25961cf7043e413abaf8ad84348988f2904b90d5
```

#### Creating the API and MCP projects
By following the steps below, we will create skeleton of the project and then we will start using it later.
```bash
$ mkdir AspireWithAI
$ cd AspireWithAI

$ dotnet new sln -f slnx
The template "Solution File" was created successfully.

$ git init
Initialized empty Git repository in /Users/sinannar/source/AspireWithAI/.git/

$ dotnet new gitignore
The template "dotnet gitignore file" was created successfully.

$ dotnet new webapi -n AspireWithAI.Api
The template "ASP.NET Core Web API" was created successfully.
Processing post-creation actions...
Restoring /Users/sinannar/source/AspireWithAI/AspireWithAI.Api/AspireWithAI.Api.csproj:
Restore succeeded.

$ dotnet new webapi -n AspireWithAI.Mcp
The template "ASP.NET Core Web API" was created successfully.
Processing post-creation actions...
Restoring /Users/sinannar/source/AspireWithAI/AspireWithAI.Mcp/AspireWithAI.Mcp.csproj:
Restore succeeded.

$ dotnet sln add AspireWithAI.Mcp/AspireWithAI.Mcp.csproj 
Project `AspireWithAI.Mcp/AspireWithAI.Mcp.csproj` added to the solution.

$ dotnet sln add AspireWithAI.Api/AspireWithAI.Api.csproj 
Project `AspireWithAI.Api/AspireWithAI.Api.csproj` added to the solution.
```
By this time, I would recommend committing your progress before you move forward to keep track of your changes.

#### Introducing Aspire
We will use aspire cli, to orchestrate our solution. After aspire is introduced to our solution, we should be able to run the application with aspire and see the default `weatherforecast` controller in action. To introduce aspire to our solution, we can run the following command:
```bash
`$ aspire init

Select AppHost Language
Choose the programming language for your Aspire AppHost.
This selection will be saved for future use.

Which language would you like to use?
                                     
> C# (.NET)                          
  TypeScript (Node.js)  

✔  Language preference saved to local configuration: C# (.NET)
ℹ  Solution detected: AspireWithAI.slnx


Add existing projects to AppHost?
The following projects were found in the solution that can be
hosted in Aspire. Select the ones that you would like to be
added to the AppHost project. You can add or remove them
later as needed.

Select projects to add to the AppHost:      
                                            
> [X] AspireWithAI.Api                      
> [X] AspireWithAI.Mcp      

Add ServiceDefaults reference to selected projects?
Do you want to add a reference to the ServiceDefaults project to
the executable projects that will be added to the AppHost? The 
ServiceDefaults project contains helper code to make it easier
for you to configure telemetry and service discovery in Aspire.

Add ServiceDefaults reference?         
                                       
> Add to all previously added projects 
  Let me choose                        
  Do not add to any projects 

ℹ  The following projects will be added to the AppHost:
☑  AspireWithAI.Api.csproj
☑  AspireWithAI.Mcp.csproj

Create NuGet.config for selected channels?
> Yes                                     
  No    
📦 Created NuGet.config for the selected package channel.
✔  Aspire initialization complete!

Would you like to configure AI agent environments for this project? [y/n] (y): y

> [X] Install Aspire skill file (Recommended)                      
  [ ] Install Playwright CLI (Recommended for browser automation)  
  [ ] Install Aspire MCP server 

✔  Create Aspire skill file (.github/skills/aspire/SKILL.md)
✔  Agent environment configuration complete.
```
What we have done here is:
- Initialized aspire apphost with C# language
- Added our projects(api and mcp) to aspire apphost
- Added ServiceDefaults reference to our projects(api and mcp)
- Configure NuGet.config
- Created aspire skill as part of agent environment configuration


#### Adding Projects to AppHost
We will add these following lines to `AppHost.cs` file to make sure our projects are part of the apphost and they will run when we run aspire.
```csharp
var mcp = builder.AddProject<Projects.AspireWithAI_Mcp>("mcp");

builder.AddProject<Projects.AspireWithAI_Api>("api")
    .WithReference(mcp).WaitFor(mcp);
```

If you are using VS Code Insider version, which I am, version 1.117.0-insider, you can run your aspire project from integrated terminal with `aspire run` and use integrated browser to navigate to dashboard as shown below.

<img width="650px;" src="/007/ss-01.png">

You can also click the urls for both `api` and `mcp` projects and append the urls with `/weatherforecast` to see the default weatherforecast controller in action as shown below.

#### Removing Boilerplate and Adding Defaults
Since we know from previous step that our both webapi project works, for both projects, `api` and `mcp`, replace `Program.cs` with the following code to remove the boilerplate code and have a clean slate to start with. We will add what we need as we move forward.
```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();
builder.AddServiceDefaults();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseHttpsRedirection();
app.MapDefaultEndpoints();

app.Run();
```

### Implementing MCP Server
There is normally a dotnet template that lets you build MCP server easily but that template is creating a console application that you expose tools through `stdio`, but we want to expose tools through `http` so we will not use this template. 


We will start adding mcp nuget package to our mcp project as shown below:
```bash
$ dotnet add package ModelContextProtocol.AspNetCore --project AspireWithAI.Mcp/AspireWithAI.Mcp.csproj
info : X.509 certificate chain validation will use the fallback certificate bundle at '/usr/local/share/dotnet/sdk/10.0.100/trustedroots/codesignctl.pem'.
info : X.509 certificate chain validation will use the fallback certificate bundle at '/usr/local/share/dotnet/sdk/10.0.100/trustedroots/timestampctl.pem'.
info : Adding PackageReference for package 'ModelContextProtocol.AspNetCore' into project 'AspireWithAI.Mcp/AspireWithAI.Mcp.csproj'.
info :   GET https://api.nuget.org/v3/registration5-gz-semver2/modelcontextprotocol.aspnetcore/index.json
info :   OK https://api.nuget.org/v3/registration5-gz-semver2/modelcontextprotocol.aspnetcore/index.json 752ms
info : Restoring packages for /Users/sinannar/source/AspireWithAI/AspireWithAI.Mcp/AspireWithAI.Mcp.csproj...
info :   GET https://api.nuget.org/v3/vulnerabilities/index.json
info :   OK https://api.nuget.org/v3/vulnerabilities/index.json 668ms
info :   GET https://api.nuget.org/v3-vulnerabilities/2026.04.15.06.14.32/vulnerability.base.json
info :   GET https://api.nuget.org/v3-vulnerabilities/2026.04.15.06.14.32/2026.04.15.06.14.32/vulnerability.update.json
info :   OK https://api.nuget.org/v3-vulnerabilities/2026.04.15.06.14.32/vulnerability.base.json 206ms
info :   OK https://api.nuget.org/v3-vulnerabilities/2026.04.15.06.14.32/2026.04.15.06.14.32/vulnerability.update.json 661ms
info : Package 'ModelContextProtocol.AspNetCore' is compatible with all the specified frameworks in project 'AspireWithAI.Mcp/AspireWithAI.Mcp.csproj'.
info : PackageReference for package 'ModelContextProtocol.AspNetCore' version '1.2.0' added to file '/Users/sinannar/source/AspireWithAI/AspireWithAI.Mcp/AspireWithAI.Mcp.csproj'.
info : Writing assets file to disk. Path: /Users/sinannar/source/AspireWithAI/AspireWithAI.Mcp/obj/project.assets.json
log  : Restored /Users/sinannar/source/AspireWithAI/AspireWithAI.Mcp/AspireWithAI.Mcp.csproj (in 2.1 sec).
```

#### Implementing MCP Tool
We implement a simple tool to descibe given temperature as shown below. We will use `McpServerToolType` attribute to mark the class that contains mcp tools and we will use `McpServerTool` attribute to mark the method that we want to expose as mcp tool. We can also use `Description` attribute to add description to both tool and its parameters which will be helpful for agent to understand the purpose of the tool and how to use it.
```csharp
[McpServerToolType]
public static class WeatherDescriberMcpTools
{
    [McpServerTool, Description("Describes the weather for given degree in celcius")]
    public static string DescribeWeather(
        [Description("degree in celcius")] int degree) => degree switch
        {
            < 0 => "Freezing",
            < 10 => "Cold",
            < 20 => "Mild",
            < 30 => "Warm",
            _ => "Hot"
        };
}
```

#### Setting up MCP Server
We will add the following lines after `AddServiceDefaults` in `Program.cs` of `mcp` project to add mcp server to our application and expose our tools through http transport. By default, mcp server uses `stdio` as transport and it is stateful, but since we want to use `http` as transport and we want to keep it stateless, we need to configure these options accordingly.
```csharp
builder.AddServiceDefaults();
builder.Services.AddMcpServer()
    .WithHttpTransport(options =>
    {
        options.Stateless = true;
    })
    .WithToolsFromAssembly(typeof(Program).Assembly);
```

We will also call `MapMcp` as below to map mcp server endpoints to our application.
```csharp
app.MapDefaultEndpoints();
app.MapMcp("/mcp");
```
