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

#### Consuming the API from Angular
Create a new file under angular project called `proxy.conf.json` and populate it with the following
```js
module.exports = {
  "/api": {
    target:
      process.env["services__apiservice__https__0"] ||
      process.env["services__apiservice__http__0"],
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
    logLevel: "debug"
  },
};
```
Then update `angular.json` file to include the proxy configuration in the serve options in `projects.AspiredAngular.architect.serve.options` section, as shown below
```json
{
  "projects": {
    // other properties
    "AspiredAngular": {
      // other properties
      "architect": {
        // other properties
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "proxyConfig": "proxy.conf.js"
          },
        },
      }
    }
  }
}
```
Create the weatherforecast model `AspireCrud/AspiredAngular/src/app/models/weather-forecast.model.ts` with the following content
```typescript
export interface WeatherForecast {
  id?: number;
  date: string;
  temperatureC: number;
  temperatureF?: number;
  summary: string;
  description?: string;
}
```
Create the weather service `AspireCrud/AspiredAngular/src/app/services/weather.service.ts` with the following content
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherForecast } from '../models/weather-forecast.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = '/api/weatherforecast';

  constructor(private http: HttpClient) {}

  getAll(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>(this.apiUrl);
  }

  create(forecast: WeatherForecast): Observable<WeatherForecast> {
    return this.http.post<WeatherForecast>(this.apiUrl, forecast);
  }

  update(id: number, forecast: WeatherForecast): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, forecast);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createBatch(): Observable<WeatherForecast[]> {
    return this.http.post<WeatherForecast[]>(`${this.apiUrl}/batch`, null);
  }

  getById(id: number): Observable<WeatherForecast> {
    return this.http.get<WeatherForecast>(`${this.apiUrl}/${id}`);
  }
}
```
Update `app.config.ts` file to provide http client configuration for our api service, as shown below
```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient()
  ]
};
```
Update `app.component.ts` file to consume the weather service and display the data in the UI, as shown below
```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from './services/weather.service';
import { WeatherForecast } from './models/weather-forecast.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Weather Forecast Manager';
  forecasts: WeatherForecast[] = [];
  loading = false;
  error: string | null = null;
  
  // Form model
  formModel: WeatherForecast = {
    date: new Date().toISOString().split('T')[0],
    temperatureC: 20,
    summary: '',
    description: ''
  };
  
  isEditing = false;
  showForm = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loadForecasts();
  }

  loadForecasts(): void {
    this.loading = true;
    this.error = null;
    this.weatherService.getAll().subscribe({
      next: (data) => {
        console.log('Loaded forecasts:', data);
        this.forecasts = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load forecasts: ' + err.message;
        this.loading = false;
      }
    });
  }

  createForecast(): void {
    this.loading = true;
    this.error = null;
    this.weatherService.create(this.formModel).subscribe({
      next: (forecast) => {
        this.forecasts.push(forecast);
        this.resetForm();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to create forecast: ' + err.message;
        this.loading = false;
      }
    });
  }

  editForecast(forecast: WeatherForecast): void {
    this.formModel = { ...forecast };
    this.isEditing = true;
    this.showForm = true;
  }

  updateForecast(): void {
    if (!this.formModel?.id) return;
    
    this.loading = true;
    this.error = null;
    const updatedData = { ...this.formModel };
    this.weatherService.update(this.formModel.id, this.formModel).subscribe({
      next: () => {
        // Update successful (204 No Content), update local data
        const index = this.forecasts.findIndex(f => f.id === updatedData.id);
        if (index !== -1) {
          this.forecasts[index] = updatedData;
        }
        this.cancelEdit();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to update forecast: ' + err.message;
        this.loading = false;
      }
    });
  }

  deleteForecast(id: number | undefined): void {
    if (!id || !confirm('Are you sure you want to delete this forecast?')) return;
    
    this.loading = true;
    this.error = null;
    this.weatherService.delete(id).subscribe({
      next: () => {
        this.forecasts = this.forecasts.filter(f => f.id !== id);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to delete forecast: ' + err.message;
        this.loading = false;
      }
    });
  }

  createBatch(): void {
    this.loading = true;
    this.error = null;
    this.weatherService.createBatch().subscribe({
      next: (newForecasts) => {
        this.forecasts.push(...newForecasts);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to create batch: ' + err.message;
        this.loading = false;
      }
    });
  }

  resetForm(): void {
    this.formModel = {
      date: new Date().toISOString().split('T')[0],
      temperatureC: 20,
      summary: '',
      description: ''
    };
    this.isEditing = false;
    this.showForm = false;
  }

  cancelEdit(): void {
    this.resetForm();
  }

  getTemperatureF(temperatureC: number): number {
    return Math.round(32 + temperatureC * 9 / 5);
  }

  getTemperatureColor(tempC: number): string {
    if (tempC < 0) return '#3b82f6'; // blue
    if (tempC < 15) return '#06b6d4'; // cyan
    if (tempC < 25) return '#10b981'; // green
    if (tempC < 35) return '#f59e0b'; // orange
    return '#ef4444'; // red
  }
}
```
update `app.component.html` file to display the data and provide UI for CRUD operations, as shown below
```html
<div class="container">
  <header>
    <h1>🌤️ {{ title }}</h1>
    <p class="subtitle">Manage your weather forecasts with full CRUD operations</p>
  </header>

  <!-- Error Message -->
  <div class="error" *ngIf="error">
    <span>⚠️ {{ error }}</span>
    <button (click)="error = null" class="close-btn">×</button>
  </div>

  <!-- Action Buttons -->
  <div class="actions">
    <button (click)="showForm = !showForm; isEditing = false; resetForm()" class="btn btn-primary">
      {{ showForm ? '❌ Cancel' : '➕ New Forecast' }}
    </button>
    <button (click)="createBatch()" class="btn btn-secondary" [disabled]="loading">
      📦 Create Batch
    </button>
    <button (click)="loadForecasts()" class="btn btn-secondary" [disabled]="loading">
      🔄 Refresh
    </button>
  </div>

  <!-- Create/Edit Form -->
  <div class="form-card" *ngIf="showForm">
    <h2>{{ isEditing ? '✏️ Edit Forecast' : '➕ Create New Forecast' }}</h2>
    <form (ngSubmit)="isEditing ? updateForecast() : createForecast()">
      <div class="form-group">
        <label for="date">Date</label>
        <input
          type="date"
          id="date"
          [(ngModel)]="formModel.date"
          name="date"
          required
        />
      </div>

      <div class="form-group">
        <label for="temperature">Temperature (°C)</label>
        <input
          type="number"
          id="temperature"
          [(ngModel)]="formModel.temperatureC"
          name="temperature"
          required
        />
        <small>
          ≈ {{ getTemperatureF(formModel.temperatureC) }}°F
        </small>
      </div>

      <div class="form-group">
        <label for="summary">Summary</label>
        <select
          id="summary"
          [(ngModel)]="formModel.summary"
          name="summary"
          required
        >
          <option value="">Select weather...</option>
          <option value="Freezing">❄️ Freezing</option>
          <option value="Bracing">🥶 Bracing</option>
          <option value="Chilly">🧊 Chilly</option>
          <option value="Cool">😌 Cool</option>
          <option value="Mild">🌤️ Mild</option>
          <option value="Warm">☀️ Warm</option>
          <option value="Balmy">🌞 Balmy</option>
          <option value="Hot">🔥 Hot</option>
          <option value="Sweltering">🥵 Sweltering</option>
          <option value="Scorching">♨️ Scorching</option>
        </select>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          [(ngModel)]="formModel.description"
          name="description"
          rows="3"
          placeholder="Add detailed weather description..."
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-success" [disabled]="loading">
          {{ isEditing ? '💾 Update' : '✅ Create' }}
        </button>
        <button type="button" (click)="cancelEdit(); resetForm()" class="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  </div>

  <!-- Loading Spinner -->
  <div class="loading" *ngIf="loading">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>

  <!-- Forecasts Grid -->
  <div class="forecasts-grid" *ngIf="!loading">
    <div class="forecast-card" *ngFor="let forecast of forecasts">
      <div class="forecast-header" [style.background]="getTemperatureColor(forecast.temperatureC)">
        <h3>{{ forecast.date | date: 'MMM d, y' }}</h3>
      </div>
      <div class="forecast-body">
        <div class="temperature">
          <span class="temp-c">{{ forecast.temperatureC }}°C</span>
          <span class="temp-f">{{ getTemperatureF(forecast.temperatureC) }}°F</span>
        </div>
        <div class="summary">{{ forecast.summary }}</div>
        <div class="description" *ngIf="forecast.description && forecast.description.trim().length > 0">
          {{ forecast.description }}
        </div>
        <div class="forecast-id">ID: {{ forecast.id }}</div>
      </div>
      <div class="forecast-actions">
        <button (click)="editForecast(forecast)" class="btn-icon" title="Edit">
          ✏️
        </button>
        <button (click)="deleteForecast(forecast.id)" class="btn-icon btn-danger" title="Delete">
          🗑️
        </button>
      </div>
    </div>
  </div>

  <!-- Empty State -->
  <div class="empty-state" *ngIf="!loading && forecasts.length === 0">
    <p>📭 No forecasts found</p>
    <p>Create your first forecast or load a batch!</p>
  </div>
</div>
```

Update `app.component.css` file to add some basic styling, as shown below
```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  color: #ffffff;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 700;
}

.subtitle {
  color: #f0f4ff;
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

/* Error Message */
.error {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border: 2px solid #ef4444;
  color: #7f1d1d;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  font-weight: 500;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #991b1b;
  transition: transform 0.2s;
}

.close-btn:hover {
  transform: scale(1.2);
}

/* Actions */
.actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
}

.btn-secondary {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.btn-secondary:hover:not(:disabled) {
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.5);
}

.btn-success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-success:hover:not(:disabled) {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5);
}

/* Form Card */
.form-card {
  background: linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%);
  border: 2px solid #e0e7ff;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.form-card h2 {
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: #475569;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  font-family: inherit;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
}

.form-group small {
  display: block;
  margin-top: 0.5rem;
  color: #64748b;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

/* Loading */
.loading {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.loading p {
  color: #ffffff;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Forecasts Grid */
.forecasts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.forecast-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.forecast-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
}

.forecast-header {
  padding: 1.25rem;
  color: white;
  text-align: center;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.forecast-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%);
  pointer-events: none;
}

.forecast-body {
  padding: 1.5rem;
}

.temperature {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1rem;
}

.temp-c {
  font-size: 2rem;
  font-weight: bold;
  color: #1e293b;
}

.temp-f {
  font-size: 1.25rem;
  color: #64748b;
}

.summary {
  text-align: center;
  font-size: 1.1rem;
  color: #475569;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.description {
  text-align: center;
  font-size: 0.9rem;
  color: #64748b;
  margin: 0.75rem 0;
  padding: 0.5rem;
  background: #f8fafc;
  border-radius: 6px;
  font-style: italic;
  line-height: 1.4;
}

.forecast-id {
  text-align: center;
  font-size: 0.875rem;
  color: #94a3b8;
}

.forecast-actions {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
}

.btn-icon {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 100%);
  transform: scale(1.15);
}

.btn-danger:hover {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

.empty-state p {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .forecasts-grid {
    grid-template-columns: 1fr;
  }

  .actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
```

When you run `aspire run` and navigate to `http://localhost:4200`, you should see the angular application with the weather forecasts being loaded from the api service. You can create, update, delete and create batch of forecasts using the UI and see the changes being reflected in the database. You can also see the logs and metrics on the dashboard for both api service and angular frontend.
<img width="650px;" src="/006/ss-09.png">

You can edit an item, create a batch of them, and delete them as well. All operations should be working seamlessly and you should see the changes in the UI immediately after performing any action. This is the power of having a distributed application with a well-defined API and a decoupled frontend.
<img width="650px;" src="/006/ss-10.png">


### Azure Function Integration
#### Creating Azure Function Project and Integration with Aspire
Now we are going to create an azure function and leverage aspire to integrate it with our existing application. Azure functions are serverless compute services that allow you to run code on-demand without having to worry about infrastructure. With aspire, we can easily add an azure function to our application and have it interact with our existing services and database. To add an azure function, we are going to use `func` cli. By following the commands below, you can create a new function project and add it to our existing solution.
```shell
sinannar@Sinans-MacBook-Pro AspireCrud % func --version
4.5.0
sinannar@Sinans-MacBook-Pro AspireCrud % func init AspireCrud.Function --worker-runtime dotnet-isolated
Writing /Users/sinannar/source/BlogTemp/AspireCrud/AspireCrud.Function/.vscode/extensions.json
sinannar@Sinans-MacBook-Pro AspireCrud % dotnet sln add AspireCrud.Function/AspireCrud_Function.csproj 
Project `AspireCrud.Function/AspireCrud_Function.csproj` added to the solution.
sinannar@Sinans-MacBook-Pro AspireCrud % dotnet reference add AspireCrud.Function/AspireCrud_Function.csproj --project AspireCrud.AppHost/AspireCrud.AppHost.csproj
Reference `..\AspireCrud.Function\AspireCrud_Function.csproj` added to the project.
```

Currently my `func` cli creates the azure function with `net8.0` target framework but we are working with `net10.0` so we need to update the target framework of the function project to `net10.0` by editing the `AspireCrud.Function.csproj` file and changing the `TargetFramework` property to `net10.0`, as shown below
```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
  </PropertyGroup>
</Project>
```
Then we will reference ServiceDefault project to our function project to use opinionated best practices by running the following command in terminal
```shell
sinannar@Sinans-MacBook-Pro AspireCrud % dotnet reference add AspireCrud.ServiceDefaults/AspireCrud.ServiceDefaults.csproj --project AspireCrud.Function/AspireCrud_Function.csproj
Reference `..\AspireCrud.ServiceDefaults\AspireCrud.ServiceDefaults.csproj` added to the project.
```

Since we successfully created the function project and added it to our solution, lets work on our aspire setup.
```shell
sinannar@Sinans-MacBook-Pro AspireCrud % aspire add azure-storage
✔  The package Aspire.Hosting.Azure.Storage::13.1.1 was added successfully.
sinannar@Sinans-MacBook-Pro AspireCrud % aspire add azure-functions
✔  The package Aspire.Hosting.Azure.Functions::13.1.1 was added successfully.
```

We should update our `AppHost.cs` to add function project and azure storage configuration to used by Azure Function. Code should look like below:
```csharp
var builder = DistributedApplication.CreateBuilder(args);

var storage = builder.AddAzureStorage("storage")
    .RunAsEmulator();

var sql = builder.AddSqlServer("sql");
var sqldb = sql.AddDatabase("sqldb");


var apiService = builder.AddProject<Projects.AspireCrud_ApiService>("apiservice")
    .WithReference(sqldb).WaitFor(sqldb)
    .WithHttpHealthCheck("/health");

var function = builder.AddAzureFunctionsProject<Projects.AspireCrud_Function>("function")
    .WithReference(apiService).WaitFor(apiService)
    .WithHostStorage(storage);

var spaWeb = builder.AddJavaScriptApp("spa", "../AspiredAngular", runScriptName: "start")
    .WithNpm(installCommand: "install")
    .WithReference(apiService).WaitFor(apiService)
    .WithUrl("http://localhost:4200")
    .WithHttpEndpoint(env: "PORT");

builder.Build().Run();
```
When we run the application with `aspire run`, you can also see the dependency graph in the dashboard.
<img width="650px;" src="/006/ss-11.png">
<img width="650px;" src="/006/ss-12.png">

#### Creating a Function and Interacting with API Service
Lets create the function that will be triggerred by timer via running `func new` in `AspireCrud.Function` project.
```shell
sinannar@Sinans-MacBook-Pro AspireCrud % cd AspireCrud.Function 
sinannar@Sinans-MacBook-Pro AspireCrud.Function % func new --name WeatherSummaryEnricher --template "Timer trigger"
'local.settings.json' found in root directory (/Users/sinannar/source/BlogTemp/AspireCrud/AspireCrud.Function).
Resolving worker runtime to 'dotnet-isolated'.
Template: Timer trigger
Function name: [Timer trigger] WeatherSummaryEnricher

Creating dotnet function...
The function "WeatherSummaryEnricher" was created successfully from the "Timer trigger" template.
```
Lets work on our `Program.cs` on our function project by adding http client to call api service.
```csharp
using System.Net.Http.Json;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = FunctionsApplication.CreateBuilder(args);

builder.ConfigureFunctionsWebApplication();
builder.AddServiceDefaults();

builder.Services
    .AddApplicationInsightsTelemetryWorkerService()
    .ConfigureFunctionsApplicationInsights();

builder.Services.AddHttpClient<WeatherForecastClient>(client =>
{
    client.BaseAddress = new Uri("https+http://apiservice");
});

builder.Build().Run();


public class WeatherForecastClient
{
    private readonly HttpClient _httpClient;

    public WeatherForecastClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<WeatherForecast>?> GetAllForecastsAsync(CancellationToken cancellationToken = default)
    {
        return await _httpClient.GetFromJsonAsync<List<WeatherForecast>>("/weatherforecast", cancellationToken);
    }

    public async Task<WeatherForecast?> CreateForecastAsync(WeatherForecast forecast, CancellationToken cancellationToken = default)
    {
        var response = await _httpClient.PostAsJsonAsync("/weatherforecast", forecast, cancellationToken);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<WeatherForecast>(cancellationToken: cancellationToken);
    }

    public async Task UpdateForecastAsync(int id, WeatherForecast forecast, CancellationToken cancellationToken = default)
    {
        var response = await _httpClient.PutAsJsonAsync($"/weatherforecast/{id}", forecast, cancellationToken);
        response.EnsureSuccessStatusCode();
    }

    public async Task DeleteForecastAsync(int id, CancellationToken cancellationToken = default)
    {
        var response = await _httpClient.DeleteAsync($"/weatherforecast/{id}", cancellationToken);
        response.EnsureSuccessStatusCode();
    }

    public async Task<List<WeatherForecast>?> CreateBatchForecastsAsync(CancellationToken cancellationToken = default)
    {
        var response = await _httpClient.PostAsync("/weatherforecast/batch", null, cancellationToken);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<List<WeatherForecast>>(cancellationToken: cancellationToken);
    }
}

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

We need to update our `WeatherSummaryEnricher.cs` function as below
```csharp
using System;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace AspireCrud.Function;

public class WeatherSummaryEnricher(ILoggerFactory loggerFactory, WeatherForecastClient weatherClient)
{
    private readonly ILogger _logger = loggerFactory.CreateLogger<WeatherSummaryEnricher>();

    [Function("WeatherSummaryEnricher")]
    public async Task Run([TimerTrigger("30 * * * * *")] TimerInfo myTimer, CancellationToken cancellationToken)
    {
        _logger.LogInformation("C# Timer trigger function executed at: {executionTime}", DateTime.Now);

        if (myTimer.ScheduleStatus is not null)
        {
            _logger.LogInformation("Next timer schedule at: {nextSchedule}", myTimer.ScheduleStatus.Next);
        }

        try
        {
            var forecasts = await weatherClient.GetAllForecastsAsync(cancellationToken);
            _logger.LogInformation("Successfully retrieved {count} weather forecasts", forecasts?.Count ?? 0);

            foreach (var forecast in forecasts ?? [])
            {
                _logger.LogInformation("Forecast for {date}: {summary} with {tempC}°C", forecast.Date, forecast.Summary, forecast.TemperatureC);

                // Determine correct summary based on temperature
                var correctSummary = forecast.TemperatureC switch
                {
                    < 0 => "Freezing",
                    >= 0 and <= 5 => "Bracing",
                    >= 6 and <= 10 => "Chilly",
                    >= 11 and <= 15 => "Cool",
                    >= 16 and <= 20 => "Mild",
                    >= 21 and <= 25 => "Warm",
                    >= 26 and <= 30 => "Balmy",
                    >= 31 and <= 35 => "Hot",
                    >= 36 and <= 45 => "Sweltering",
                    _ => "Scorching"
                };

                // Update if summary is incorrect
                if (forecast.Summary != correctSummary || string.IsNullOrEmpty(forecast.Description))
                {
                    _logger.LogInformation("Updating forecast {id}: '{oldSummary}' -> '{newSummary}'",
                        forecast.Id, forecast.Summary, correctSummary);

                    forecast.Summary = correctSummary;
                    await weatherClient.UpdateForecastAsync(forecast.Id, forecast, cancellationToken);
                }
            }

            _logger.LogInformation("Weather summary enrichment completed");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calling ApiService");
        }
    }
}
```
With all the code is put in place, we should see function working on our traces calling our APIs.
<img width="650px;" src="/006/ss-13.png">
<img width="650px;" src="/006/ss-14.png">

What does this function do is that fix the description of weather forecast that was randomised before
<img width="650px;" src="/006/ss-15.png">
<img width="650px;" src="/006/ss-16.png">

### Github Models Integration

