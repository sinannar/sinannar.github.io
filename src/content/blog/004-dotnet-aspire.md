---
title: 'Intro to .Net Aspire'
description: 'Running things locally'
pubDate: 'July 28 2025'
heroImage: '/004-dotnetaspire.jpg'
---

### Intro
Today we are going to talk about .Net Aspire. Running and debugging microservices is hard and you may directly heard that you should not run them. In the future, we will deep dive into .Net Aspire with example code repository but today we are running with a bit more of a bird eye view. Lets focus on our problem first that is represented as a diagram below:

### Problem
<img width="650px;" src="/004-01-dotnetaspire.png">

What we have here is:
1. Storage queue
2. Azure function
3. CosmosDB
4. Azure function
5. SQL Database
6. Storage queue
7. Azure function that writes to customers api endpoint

If we create a dotnet solution, Azure Functions can be part of the dotnet solution. Functions are interacting with queues, sqldb and cosmosdb resources which are either real resources or containerised resources. If it is real resources, we might have bicep or terraform code, if we are luck. For local testing tho, either we need simulators installed or we would use containerised resources. We prefer containerised resources because we can tier them down when we are done with them easily. So we have custom source code for functions, infrastructure code or docker compose for the infrastructure. If we only have a way that can show both infra and consuming resources in one place, with a strongly typed language, that would be amazing. Aspire solves this with C#.

### Aspire Host
```csharp
var builder = DistributedApplication.CreateBuilder(args);

// Infra
var storage = builder.AddAzureStorage("storage").RunAsEmulator();   
var queueAt1 = storage.AddQueues("queueAt1");
var queueAt6 = storage.AddQueues("queueAt6");

var cosmosAt3 = builder.AddAzureCosmosDB("cosmos-db")
                    .RunAsEmulator();

var sql = builder.AddSqlServer("sql");
var sqldbAt7 = sql.AddDatabase("database");

// Apps
var functionAt2 = builder.AddAzureFunctionsProject<Projects.Function2>("function2")
                       .WithReference(queueAt1).WaitFor(queueAt1)
                       .WithReference(cosmosAt3).WaitFor(cosmosAt3)
                       .WithHostStorage(storage);

var functionAt4 = builder.AddAzureFunctionsProject<Projects.Function4>("function4")
                       .WithReference(queueAt6).WaitFor(queueAt6)
                       .WithReference(cosmosAt3).WaitFor(cosmosAt3)
                       .WithReference(sqldbAt7).WaitFor(sqldbAt7)
                       .WaitFor(functionAt2)
                       .WithHostStorage(storage);

var functionAt7 = builder.AddAzureFunctionsProject<Projects.Function7>("function7")
                       .WithReference(queueAt6).WaitFor(queueAt6)
                       .WaitFor(functionAt4)
                       .WithHostStorage(storage);

// Run
builder.Build().Run();
```

In this aspire apphost setup, we defined each function defined at step2, step4 and step7 as single function in a function project. Aspire has support for `Worker SDK` as well actually, which can be found from the [Database Migration Sample](https://github.com/dotnet/aspire-samples/tree/main/samples/DatabaseMigrations).

One of the benefits of the aspire is dashboard, which shows your services state, logs, traces and more useful metrics.
<img width="1000px;" src="https://learn.microsoft.com/en-us/dotnet/aspire/docs/fundamentals/dashboard/media/explore/projects.png#lightbox">

Aspire lets you bootstrap your application with a well supported strongly typed languguage and let you have open telemetry dashboard to consume metrics, logs and traces as well as debug your application from single run button.

Aspire is not reserved for just C# technoligies. You can run Java, Python and bunch of other technologies as well as front end technologies like Angular, React and Vue.

Lets say you dont like `cosmos` and `sql` at the solution, you can replace it with `mongodb` and `postgres`. Some of your workload may not be azure functon but something written in go, pythong or jave and you can integrate them as well.

```csharp
// Adding Go
var golang = builder.AddGolangApp("golang", "../gin-api")
    .WithHttpEndpoint(env: "PORT");

// Adding NodeJS
builder.AddViteApp("vite-demo")
       .WithExternalHttpEndpoints();

builder.AddViteApp("yarn-demo", packageManager: "yarn")
       .WithExternalHttpEndpoints();

builder.AddViteApp("pnpm-demo", packageManager: "pnpm")
       .WithExternalHttpEndpoints();

// Adding Rust
builder.AddRustApp("rust-app", workingDirectory: "../rust-service")
        .WithHttpEndpoint(env: "PORT");

// Adding Deno
builder.AddDenoApp("oak-demo", "main.ts", permissionFlags: ["--allow-env", "--allow-net"])
    .WithHttpEndpoint(env: "PORT")
    .WithEndpoint();
```


### Service Defaults
Aspire comes with 2 extra project, one is apphost where we define our application workloads with infrastructure. We also have something called service defaults.
The `YOURAPPNAME.ServiceDefaults` project has a single `Extensions.cs` file that contains extension methods. You probably directly use `AddServiceDefaults` and `MapDefaultEndpoints`.

The `AddServiceDefaults` method handles the following tasks:
- Configures OpenTelemetry metrics and tracing.
- Adds default health check endpoints.
- Adds service discovery functionality.
- Configures HttpClient to work with service discovery.

The `MapDefaultEndpoints` method:
- Allows consumers to optionally uncomment some code to enable the Prometheus endpoint.
- Maps the health checks endpoint to `/health`.
- Maps the liveness endpoint to `/alive` route where the health check tag contains live.

### References:
0. [.NET Aspire Docs](https://learn.microsoft.com/en-us/dotnet/aspire/)
1. [Azure Function with Aspire](https://github.com/dotnet/aspire-samples/blob/main/samples/AspireWithAzureFunctions/ImageGallery.AppHost/AppHost.cs)
2. [Cosmos with Aspire](https://learn.microsoft.com/en-us/dotnet/aspire/database/azure-cosmos-db-integration?tabs=dotnet-cli)
3. [Sql with Aspire](https://learn.microsoft.com/en-us/dotnet/aspire/database/sql-server-integration?tabs=dotnet-cli%2Cssms)
4. [Aspire Samples](https://github.com/dotnet/aspire-samples/tree/main)
5. [Aspire Integrations](https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/integrations-overview)
6. [Aspire Community Toolkit](https://learn.microsoft.com/en-us/dotnet/aspire/community-toolkit/overview)
7. [Aspire Service Defaults](https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/service-defaults)
