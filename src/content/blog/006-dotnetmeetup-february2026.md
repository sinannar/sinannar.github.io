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
Lets start with integrating Sql Server to our application and writing some CRUD operations for the weatherforecast endpoints. We will be using `Aspire.Hosting.SqlServer` package to register a sql server resource in our apphost and then we will use `Aspire.Microsoft.EntityFrameworkCore.SqlServer` package to write the data access code in our apiservice. Lets do those step by step.
```shell
sinannar@Sinans-MacBook-Pro AspireCrud % pwd
/Users/sinannar/source/BlogTemp/AspireCrud
sinannar@Sinans-MacBook-Pro AspireCrud % aspire add sqlserver
✔  The package Aspire.Hosting.SqlServer::13.1.1 was added successfully.

sinannar@Sinans-MacBook-Pro AspireCrud % cd AspireCrud.ApiService
sinannar@Sinans-MacBook-Pro AspireCrud.ApiService % dotnet add package Aspire.Microsoft.EntityFrameworkCore.SqlServer                                                                       
sinannar@Sinans-MacBook-Pro AspireCrud.ApiService % dotnet add package Microsoft.EntityFrameworkCore.Design
```

#### Using SQL Server in AppHost
Now we need to register the sql server resource in our apphost and also we need to configure the connection string for it. We can do this by adding the following code to our apphost code.
```csharp
var sql = builder.AddSqlServer("sql");
var sqldb = sql.AddDatabase("sqldb");
```
With this sql and sqldb resource registered, we can now use it in our services by referencing it in the service configuration. We will be doing this in the next step when we configure our apiservice to use the sql server resource.
```csharp
var apiService = builder.AddProject<Projects.AspireCrud_ApiService>("apiservice")
    .WithReference(sqldb).WaitFor(sqldb)
    .WithHttpHealthCheck("/health");
```

#### Replacing the WeatherForecast model
```csharp
// Find the WeatherForecast record in Program.cs in ApiService project
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
```
```csharp
// Replace it with the following code and move it to a new file called WeatherForecast.cs in the same project
public class WeatherForecast
{
    public int Id { get; set; }
    public DateOnly Date { get; set; }
    public int TemperatureC { get; set; }
    public string? Summary { get; set; }

    public string? Description { get; set; }

    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
```
This change will break the existing `app.MapGet("/weatherforecast"` endpoint because it is using the old record type, so we need to modify it to use the new class type and also we need to change the implementation to return data from the database instead of returning hardcoded data. We will be using Entity Framework Core to access the database and we will be using the DbContext class to manage the database connection and operations. For now, you can comment out the existing implementation of the endpoint and we will come back to it later after we set up the database and the DbContext. 
```csharp// Comment out the existing implementation of the endpoint in Program.cs in ApiService project
// app.MapGet("/weatherforecast", () =>
// {
//    ...
// })
// .WithName("GetWeatherForecast");
```

#### Adding DbContext and Repository
Best practice is creating classes in their own files, but for the sake of the demo, I will be appending the code to the Program.cs file. You can refactor it later if you want. You may want to add `using Microsoft.EntityFrameworkCore;` at the top of the file.
```csharp
// Add the following DbContext class to the same project, you can name it AppDbContext.cs
public class AppDbContext(DbContextOptions<AppDbContext> options)
    : DbContext(options)
{
    public DbSet<WeatherForecast> WeatherForecasts => Set<WeatherForecast>();
}
```

#### Configuring the services
Now we need to configure the services in our apphost to use the sql server resource we registered and also to use the DbContext we created.  
```csharp
builder.AddSqlServerDbContext<AppDbContext>("sqldb");
```
One important thing here is to note that we are using the `builder.AddSqlServerDbContext` instead of `builder.Services.AddDbContext` because we want to use the best practices implemented in `Aspire.Microsoft.EntityFrameworkCore.SqlServer` package, which will automatically wire up the connection string from the apphost configuration and also it will add some diagnostic enrichment for our DbContext.

I want to put a focus on `"sqldb"` name we are using here, which is the name of database resource we registered in the apphost and now it became availablee for us to use in the api service. 
<img width="950px;" src="/006/ss-05.png">

This is how the service discovery works in aspire, and if you dig deep into `builder.AddServiceDefaults();` line in the api service configuration, you will see that is actually coming from ServiceDefaults project which has only one `Extensions.cs` file that registers the followings by default:
- Open Telemetry
- Default Health Checks
- Service Discovery
- Http Client Defaults (eg. Service discovery for http clients, retry policies, etc.)

#### Creating Migrations and Updating the Database
Before we go and create a migration, I want to add this code piece between `app.MapDefaultEndpoints();` and `app.Run();` to api service so that when the application starts, it automatically run migrations and update the databasep, and insert some random data to test read endpoints.
```csharp
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
    if (!db.WeatherForecasts.Any())
    {
        var rng = new Random();
        var forecasts = Enumerable.Range(1, 3).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = rng.Next(-20, 55),
            Summary = summaries[rng.Next(summaries.Length)]
        }).ToArray();

        db.WeatherForecasts.AddRange(forecasts);
        db.SaveChanges();
    }
}
```
Now we are ready to create migrations, lets navigate to ApiService project and create a migration using the following command.
```shell
sinannar@Sinans-MacBook-Pro AspireCrud % pwd
/Users/sinannar/source/BlogTemp/AspireCrud
sinannar@Sinans-MacBook-Pro AspireCrud % cd AspireCrud.ApiService
sinannar@Sinans-MacBook-Pro AspireCrud.ApiService % dotnet ef migrations add InitialWeatherForecast
Build started...
Build succeeded.
The Entity Framework tools version '10.0.0' is older than that of the runtime '10.0.3'. Update the tools for the latest features and bug fixes. See https://aka.ms/AAc1fbw for more information.
Done. To undo this action, use 'ef migrations remove'
sinannar@Sinans-MacBook-Pro AspireCrud.ApiService % ls Migrations
20260216072957_InitialWeatherForecast.cs
20260216072957_InitialWeatherForecast.Designer.cs
AppDbContextModelSnapshot.cs
sinannar@Sinans-MacBook-Pro AspireCrud.ApiService %
```

#### Update the endpoints for CRUD
Now we can replace that commented api, `GetWeatherForecast`, with the followings to have the full CRUD operations for our WeatherForecast entity. We will be using the DbContext to access the database and perform the operations.
```csharp
app.MapGet("/weatherforecast", async (AppDbContext db) =>
{
    return await db.WeatherForecasts
                   .OrderBy(w => w.Date)
                   .ToListAsync();
});

app.MapPost("/weatherforecast", async (WeatherForecast forecast, AppDbContext db) =>
{
    db.WeatherForecasts.Add(forecast);
    await db.SaveChangesAsync();
    return Results.Created($"/weatherforecast/{forecast.Id}", forecast);
});

app.MapPut("/weatherforecast/{id:int}", async (int id, WeatherForecast input, AppDbContext db) =>
{
    var existing = await db.WeatherForecasts.FindAsync(id);
    if (existing is null) return Results.NotFound();

    existing.Date = input.Date;
    existing.TemperatureC = input.TemperatureC;
    existing.Summary = input.Summary;
    existing.Description = input.Description;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/weatherforecast/{id:int}", async (int id, AppDbContext db) =>
{
    var existing = await db.WeatherForecasts.FindAsync(id);
    if (existing is null) return Results.NotFound();

    db.WeatherForecasts.Remove(existing);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapPost("/weatherforecast/batch", async (AppDbContext db) =>
{
    var rng = new Random();
    var forecasts = Enumerable.Range(1, 5).Select(index => new WeatherForecast
    {
        Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
        TemperatureC = rng.Next(-20, 55),
        Summary = summaries[rng.Next(summaries.Length)]
    }).ToArray();
    db.WeatherForecasts.AddRange(forecasts);
    await db.SaveChangesAsync();
    return Results.Created("/weatherforecast/batch", forecasts);
});
```
Before we go further, there is `.http` file in your api project and if you replace the content with the following code, you can easily test your endpoints using the `Rest Client` extension in VS Code. You can also use Postman or any other API testing tool if you prefer. Just keep the `@ApiService_HostAddress` at the top and replace all lines after that with the following code to have the requests for all the endpoints we created.
```http
GET {{ApiService_HostAddress}}/weatherforecast/
Accept: application/json
###
POST {{ApiService_HostAddress}}/weatherforecast
Content-Type: application/json

{
  "date": "2026-02-15",
  "temperatureC": 25,
  "summary": "Warm"
}
###
PUT {{ApiService_HostAddress}}/weatherforecast/1
Content-Type: application/json

{
  "date": "2026-02-16",
  "temperatureC": 30,
  "summary": "Hot"
}
###
DELETE {{ApiService_HostAddress}}/weatherforecast/1

###
POST {{ApiService_HostAddress}}/weatherforecast/batch
Content-Type: application/json

###
```

As next, run `aspire run` from somewhere in the app and use `.http` file to test your CRUD endpoints. You should see the data being stored in the database and you can also see the logs and metrics on the dashboard.
<img width="650px;" src="/006/ss-06.png">

### Javascript Integration
Up until now, we have introduced sqlserver and implement a real CRUD operations for our weatherforecast entity, but we are still using the default Blazor frontend created by aspire cli, which is not bad at all, but I want to show you how you can easily replace it with an Angular frontend and consume the same endpoints we created in the api service.

#### Removing Blazor
Remove the Blazor FE by running the following commands
```shell
sinannar@Sinans-MacBook-Pro AspireCrud % pwd
sinannar@Sinans-MacBook-Pro AspireCrud % dotnet reference remove AspireCrud.Web/AspireCrud.Web.csproj --project AspireCrud.AppHost/AspireCrud.AppHost.csproj                                                                                            
Project reference `../AspireCrud.Web/AspireCrud.Web.csproj` removed.
/Users/sinannar/source/BlogTemp/AspireCrud
sinannar@Sinans-MacBook-Pro AspireCrud % dotnet sln remove AspireCrud.Web/AspireCrud.Web.csproj
Project `AspireCrud.Web/AspireCrud.Web.csproj` removed from the solution.
sinannar@Sinans-MacBook-Pro AspireCrud % rm -rf AspireCrud.Web
```

Then remove the following code from `AppHost.cs` file to remove the web frontend service configuration.
```csharp
builder.AddProject<Projects.AspireCrud_Web>("webfrontend")
    .WithExternalHttpEndpoints()
    .WithHttpHealthCheck("/health")
    .WithReference(apiService)
    .WaitFor(apiService);
```

Remaining of `AppHost.cs` file should look like this after the change:
```csharp
var builder = DistributedApplication.CreateBuilder(args);

var sql = builder.AddSqlServer("sql");
var sqldb = sql.AddDatabase("sqldb");

var apiService = builder.AddProject<Projects.AspireCrud_ApiService>("apiservice")
    .WithReference(sqldb).WaitFor(sqldb)
    .WithHttpHealthCheck("/health");

builder.Build().Run();
```

#### Adding Angular
Before we run into next step of creating angular project, I would like to verify my current setup with the following commands. If you do not have these tools installed, you can easily install them by following the instructions on their official websites. If you have npm installed, you can run `npm install -g @angular/cli` to install angular cli globally on your machine.
```shell
sinannar@Sinans-MacBook-Pro AspireCrud % node --version
v22.15.1
sinannar@Sinans-MacBook-Pro AspireCrud % npm --version
11.8.0
sinannar@Sinans-MacBook-Pro AspireCrud % ng --version
19.2.12
```
By typing `ng new AspiredAngular --style css --routing true --ssr=no` to terminal, at the root of repository, we can create a new angular project with the name `AspiredAngular`. This command will create a new angular project with the default configuration and it will also add the necessary files for us to run the angular application. After running this command, you should see a new folder named `AspiredAngular` in your repository, which contains the angular project. Output will be something like this:
```shell
sinannar@Sinans-MacBook-Pro AspireCrud % ng new AspiredAngular --style css --routing true --ssr=no
CREATE AspiredAngular/README.md (1478 bytes)
CREATE AspiredAngular/.editorconfig (314 bytes)
CREATE AspiredAngular/.gitignore (587 bytes)
CREATE AspiredAngular/angular.json (2623 bytes)
CREATE AspiredAngular/package.json (1010 bytes)
CREATE AspiredAngular/tsconfig.json (915 bytes)
CREATE AspiredAngular/tsconfig.app.json (424 bytes)
CREATE AspiredAngular/tsconfig.spec.json (434 bytes)
CREATE AspiredAngular/.vscode/extensions.json (130 bytes)
CREATE AspiredAngular/.vscode/launch.json (470 bytes)
CREATE AspiredAngular/.vscode/tasks.json (938 bytes)
CREATE AspiredAngular/src/main.ts (250 bytes)
CREATE AspiredAngular/src/index.html (300 bytes)
CREATE AspiredAngular/src/styles.css (80 bytes)
CREATE AspiredAngular/src/app/app.component.css (0 bytes)
CREATE AspiredAngular/src/app/app.component.html (19903 bytes)
CREATE AspiredAngular/src/app/app.component.spec.ts (940 bytes)
CREATE AspiredAngular/src/app/app.component.ts (290 bytes)
CREATE AspiredAngular/src/app/app.config.ts (310 bytes)
CREATE AspiredAngular/src/app/app.routes.ts (77 bytes)
CREATE AspiredAngular/public/favicon.ico (15086 bytes)
✔ Packages installed successfully.
    Directory is already under version control. Skipping initialization of git.
```
Either you can wait for angular cli to install the packages, or you can open another terminal and start adding javascript integration for our aspire application while the installation is in progress. Since it has been for a while, added packages might change overtime.
```shell
sinannar@Sinans-MacBook-Pro AspireCrud % aspire add javascript
✔  The package Aspire.Hosting.JavaScript::13.1.1 was added successfully.
```
We will adapt aspire apphost to serve our angular application by using `AddJavaScriptApp` method, as shown below. With this change, AppHost should look like below
```csharp
var builder = DistributedApplication.CreateBuilder(args);

var sql = builder.AddSqlServer("sql");
var sqldb = sql.AddDatabase("sqldb");

var apiService = builder.AddProject<Projects.AspireCrud_ApiService>("apiservice")
    .WithReference(sqldb).WaitFor(sqldb)
    .WithHttpHealthCheck("/health");

var spaWeb = builder.AddJavaScriptApp("spa", "../AspiredAngular", runScriptName: "start")
    .WithNpm(installCommand: "install")
    .WithReference(apiService).WaitFor(apiService)
    .WithUrl("http://localhost:4200")
    .WithHttpEndpoint(env: "PORT");
    
builder.Build().Run();
```

When you run via `aspire run`, you should see `spa-installer` will be run before `spa` is running.
<img width="950px;" src="/006/ss-07.png">
<img width="950px;" src="/006/ss-08.png">
When everything is ready, you can navigate to `http://localhost:4200` and you should see the default angular application running.

### Azure Function Integration

### Github Models Integration

