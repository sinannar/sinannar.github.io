---
title: '.Net Aspire @ Junior Dev UG'
description: '.Net Aspire with Code Examples'
pubDate: 'August 4 2025'
heroImage: '/005-juniordev-meetup.png'
---

### Intro
I will be presenting at [Junior Dev](https://www.meetup.com/juniordev-auckland/) User group at [6th of August](https://www.meetup.com/juniordev-auckland/events/310074767). My topic will be about .Net Aspire as I start talking about in my previous blog post. I will talk about how we used to leverage `docker compose` to containerise SQL, Redis and Queue from the following architecture and how `.net aspire` can help us bootstrap everything in one place with single source of truth.

<img width="650px;" src="/005-demoappdiagram.png">

### Content of the Talk
- how we were using docker compose and run multiple services with seperate terminals
- how aspire can help us bootstrap the given architecture
- what is aspire dashboard and what are the tabs
- mentioned other integrations and examples (from [Aspire Samples](https://github.com/dotnet/aspire-samples/tree/main/samples))
    - showing multiple service integration example (AspireShop)
    - using azure functions (ImageGallery)
    - showing angular, vue, react in apphost (AspireJavaScript)
    - using pyhton with aspire (AspireWithPython)
    - using wpf and windforms (ClientAppsIntegration)
    - using dockerfile in apphost (ContainerBuild)
    - database migrations and WorkerSdk (DatabaseMigrations)
    - containers in apphost (Metrics)
    - container data volume and lifetime (VolumeMount)

One thing I do not talk much about is the nuget packages comes with `aspire`, so I decided to use this space to talk about them.

### 🔧 Aspire.Hosting.* Packages
These packages are part of the application orchestration layer of Aspire. They simplify configuring, running, and connecting services in a distributed app (often during development and testing). They don’t include SDKs or client libraries for calling services; instead, they help register services as resources for the orchestration host (AppHost) and set up development-time features like service discovery and environment variables.

| Package                     | What it does                                                                                                 |
|----------------------------|--------------------------------------------------------------------------------------------------------------|
| Aspire.Hosting.Azure.Storage | Registers Azure Storage resources (e.g., blob, queue, table) so Aspire can manage connection strings, secrets, service bindings, etc. |
| Aspire.Hosting.Redis         | Declares a Redis container/service that your app can connect to.                                            |
| Aspire.Hosting.SqlServer     | Adds a SQL Server resource to your app topology—used in orchestration, not data access itself.              |
| Aspire.Hosting.NodeJs        | Integrates a Node.js service (via project reference or executable) into Aspire's orchestration.             |

### 📦 Aspire.* Wrapper Packages
These are higher-level packages that wrap existing .NET SDKs or libraries (like Azure.Storage.Queues or Microsoft.EntityFrameworkCore.SqlServer) and add Aspire-specific features like:
- Auto-wiring of connection strings from AppHost
- Diagnostic enrichment
- Configuration via Aspire's service discovery
- Simplified DI registration

| Package                       | What it does                                                                                                              |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| Aspire.Hosting.Azure.Storage | Registers Azure Storage resources (e.g., blob, queue, table) so Aspire can manage connection strings, secrets, service bindings, etc. |
| Aspire.Hosting.Redis         | Declares a Redis container/service that your app can connect to.                                                         |
| Aspire.Hosting.SqlServer     | Adds a SQL Server resource to your app topology—used in orchestration, not data access itself.                           |
| Aspire.Hosting.NodeJs        | Integrates a Node.js service (via project reference or executable) into Aspire's orchestration.                          |

### 🆚 Aspire vs. Native NuGet Packages
- Use Aspire.Hosting.* in your AppHost project to register and orchestrate services like Redis, SQL Server, Azure resources, etc.
- Use Aspire.* wrapper packages in your application projects to auto-wire and configure service clients.
- The wrappers simplify cloud-native development and reduce boilerplate, especially when using Aspire's application model.

| Aspect    | Aspire-native integration for cloud-native orchestration | General-purpose .NET libraries for direct use       |
|-----------|-----------------------------------------------------------|-----------------------------------------------------|
| Purpose   | Aspire-native integration for cloud-native orchestration | General-purpose .NET libraries for direct use       |
| Setup     | Automatically configured via Aspire environment          | Manual configuration of endpoints, credentials      |
| DI        | Usually adds DI extensions                               | Often manual setup or partial DI                    |
| Best for  | Aspire-based apps                                        | Standalone apps or custom setups                    |


```csharp
// Using native
builder.Services.AddDbContext<AppDbContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("Sql"));
});

// Using Aspire
builder.AddSqlServerDbContext<AppDbContext>("appDb");
```

### References:
- [Junior Dev User Group](https://www.meetup.com/juniordev-auckland/)
- [Junior Dev 6Aug2025 Event](https://www.meetup.com/juniordev-auckland/events/310074767)
- [.Net Aspire Presentation Files](https://github.com/sinannar/JuniorDev-6August2025)
- [Aspire Samples](https://github.com/dotnet/aspire-samples/tree/main/samples)
