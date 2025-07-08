---
title: 'Projects & Solution'
description: 'Working w Projects'
pubDate: 'July 11 2025'
heroImage: '/003-projects-solutions.png'
---

## 🗃️ Projects 

Today, we are going to talk about projects and structure of solution. Why we might need multiple project to serve as one application or API. This question has multiple answer.
1. Tight Coupling: All layers living together start cousing problems when application grow. 
Any change in one part can easily effect others. Not having clear boundrise make it harder to reason about change.
2. Difficult to Test: Unit testing becomes tricky without seperation. You end up mocking too mauch or testing too little.
3. Poor Scalability: Lets assume you want to add background workers and queue processing. With single project setup, mixing all in one project, devs will step on each other's toes all the time and version control conflicts will rise. 
4. Hard to Maintain: Business logic is mixed with UI and database code makes it harder to onboard new developer and in long run you ended up having noone knows whats happenning.
5. Code Reuse is Limited: If you want to reuse your domain models or logic in your Blazor app, background worker or Azure Function, you will need to extract them anyway. Every new line of code is a possible bug so if you reuse existing code which is tested, it is better. This is why we do not reinvent the wheel and use packages for common problems.

#### 📖 Content
1. [One project to Rule them all](#-rule-them-all)
2. [Breaking it up](#️-divide-and-conquer)
3. [Introducing Clean Architecture](#️-clean-architecture-with-domain-driven-designddd)

---

## 💍 Rule them All
We put 5 bullet points up there and are still going to talk about why you might need a single project to put everything together. Answer might be that you are a solo developer, or you are developing an MVP or you hacking your problem away for 48 hours for an hackathon. There are times you may want to keep structure simple, iterate fast and dont worry about scalability or seperation of concern. I still would like you to have fun in that limited time and structure your code with folders. Example can be:
```
/MyApp
│
├── /Controllers          # API endpoints (e.g., UserController.cs)
├── /Models               # Domain or DTO models
├── /Data                 # DbContext, EF models, migrations
├── /Services             # Business logic or service classes
├── Program.cs            # Entry point (minimal API or full Startup)
└── MyApp.csproj
```
I use C# and .Net in one of the hackathons I joined and my friend was quite suprised. I believe the shortest path is the path you know so I am more familiar with C# and .Net, that's why I used it at the time. With the situation awareness, I will not create complicated structure so hacking an API in 24 hours is no brainer.

---

## 🛡️ Divide and Conquer
You have an app bigger than demo or proof of concept, and you want to enforce some seperation of concerns, with some unit and integration tests, then you can jump into this category and start organizing your solution into logical layers with one project per responsibility when you don't want to jump into Clean Architecture. Here is an example of basic layered architecture:

```
/MyApp.sln
│
├── MyApp.Api.csproj        # ASP.NET Core Web API
├── MyApp.Core.csproj       # Business logic, interfaces, models, value objects
├── MyApp.Data.csproj       # EF Core DbContext, migrations, repository implementations
├── MyApp.Worker.csproj     # Background processing or long-running tasks
└── MyApp.Tests.csproj      # Unit & integration tests
```
1. Core project is where you put your business logic and interfaces. You put your domain models, business rules, service interfaces, and value objects. If you use the repository pattern, the interfaces should live here.
2. Data project contains your EF Core DbContext and migrations. You implement your service interfaces from your Core project here because your data access lives here. If you implement the repository pattern, you create interfaces in Core and implement them here.
3. Api project is your ASP.NET Core API with controllers and startup or minimal API endpoints. Request and response DTOs can reside here. Dependency injection registration is done here. Middleware, filters, and global settings live here.
4. Worker project contains background services such as hosted services, queue consumers, scheduled tasks, or any long-running processes that run separately from your API but use the same Core logic and Data access. This separation keeps your background processing concerns isolated and allows scaling independently.
5. Tests project contains unit and integration tests for your Core, Data, Api, and Worker projects. Keeping tests in a dedicated project promotes maintainability and clear separation from production code.

This layered approach enforces clear seperation of concerns:
- Core defines your business domain and contracts.
- Data encapsulates data access implementation.
- Api handles HTTP and application hosting concerns.
- Worker isolates background processing.
- Tests ensure your code behaves correctly.

---

## 🏗️ Clean Architecture with Domain Driven Design(DDD)
Clean Architecture combined with Domain-Driven Design is a powerful pattern that helps you build scalable, maintainable, and testable software by organizing code around the business domain and enforcing strict dependency rules. Domain-Driven Design (DDD) focuses on modeling complex business domains using rich domain models, ubiquitous language, and tactical patterns like entities, value objects, aggregates, repositories, and domain events. Clean Architecture focuses on the separation of concerns by organizing software into layers with clear dependencies that point inward toward the domain, protecting the core business logic from external concerns.

#### ⚙️ Domain Driven Design(DDD) Tachtical Patterns Briefly
Domain-Driven Design (DDD) provides several *tactical* building blocks to help you model your business logic more accurately and maintainably. Here’s a quick overview with simple examples:

| Pattern             | Description                                                                 | Example                                                               |
|---------------------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------|
| **Entity**          | An object with a unique identity that persists over time and changes state. | `Order`, `User`, `Invoice` — each has an `Id`.                        |
| **Value Object**    | An immutable type identified only by its value, not by identity.            | `Money`, `EmailAddress`, `Address` — no `Id`, equality by value.      |
| **Aggregate**       | A cluster of related entities treated as a single unit for data changes.    | `Order` with `OrderLines` inside it — changes go through the `Order`. |
| **Repository**      | A pattern to abstract access to aggregates from a data store.               | `IOrderRepository` with `GetById`, `Add`, `Update` methods.           |
| **Domain Event**    | Something that has happened in the domain that other parts may react to.    | `OrderPlacedEvent` published when an order is completed.              |
| **Application Service** | Coordinates use cases, orchestrates domain logic via repositories.     | `CreateOrderHandler` uses repo, entities, domain services.             |

#### ✅ **Tip for Beginners:**  
- Put **Entities**, **Value Objects**, and **Events** in the `Domain` project.  
- Implement **Repositories** in `Persistence`, but define interfaces in `Domain`.  
- Put **Application Services** (like MediatR handlers) in the `Application` project.

#### 🗂️ Project Folder Structure
```
/MyApp.sln
│
├── /app                          # Host applications (entrypoints)
│   ├── MyApp.WebApi              # ASP.NET Core Minimal API or MVC (thin, only config & DI)
│   ├── MyApp.Function            # Azure Function host (binds triggers from Presentation)
│   └── MyApp.Worker              # Worker Service host (executes background jobs from Presentation)
│
├── /src                          # Core business layers and implementations
│   ├── MyApp.Domain              # 🧠 Domain models, value objects, aggregates, interfaces, domain events
│   ├── MyApp.Application         # 🧩 Use cases, CQRS handlers, interfaces, validators, business rules
│   ├── MyApp.Persistence         # 🗃 EF Core DbContext, repositories, migrations (implements Domain interfaces)
│   ├── MyApp.Infrastructure      # 🌐 External adapters (Email, Blob Storage, Redis, etc.)
│   ├── MyApp.Presentation        # 🎯 Controllers, Azure Functions, Hosted Services, DTOs, validation
│   └── MyApp.Tests               # 🧪 Shared test base, mocks, test builders
│
├── /tests                        # Layer-specific test projects
│   ├── MyApp.Application.Tests   # Unit tests for use cases, validators, handlers
│   ├── MyApp.Infrastructure.Tests# Unit tests for infrastructure services
│   └── MyApp.IntegrationTests    # End-to-end tests across the full stack
│
├── README.md
├── Directory.Build.props         # Centralized package versions and code style
└── NuGet.Config / .editorconfig  # Optional
```
#### 🧩 Dependency Flow
Domain is the heart of the system, completely isolated. Application orchestrates use cases but depends only on Domain. Presentation, Infrastructure, and Persistence depend on Application, but never the other way around. Host projects only register dependencies and configure runtime — they're thin wrappers.
```
                        WebApi / Function / Worker
                                    ↓
                                Presentation
                                    ↓
                                Application
                                    ↓
                                Domain
                            ↑               ↑
                        Infrastructure   Persistence
```
#### 💡 Why This Works?

| Principle                   | Applied via…                                                                  |
|----------------------------|-------------------------------------------------------------------------------|
| **Separation of concerns** | Each project/layer handles a single responsibility                           |
| **Inversion of Control**   | Application layer depends on abstractions, implemented in outer layers       |
| **Testability**            | Business rules are isolated and testable without web or DB dependencies      |
| **Flexibility**            | Swap database, change presentation layer, or replace infrastructure easily   |
| **Domain purity**          | Core logic is independent of web frameworks, UI, or infrastructure concerns  |

#### 🔍 Clean Architecture + DDD through the Lens of SOLID
SOLID is a set of five principles that promote maintainable and extendable software. Here's how each one maps to your layered architecture:
1. Single Reponsibility Principle (SRP): A class should have only one reason to change. Each project has a single concern. Each class (e.g., `CreateOrderHandler`, `OrderService`) has one responsibility, making it easier to test and modify.
    - `Domain`: models and domain rules only
    - `Application`: use cases only
    - `Infrastructure`: external systems only
    - `Presentation`: endpoint logic only
2. Open/Closed Principle (OCP): Software entities should be open for extension but closed for modification. Interfaces (e.g., `IOrderRepository`, `IEmailSender`) are defined in Domain or Application, and new implementations can be added without modifying existing logic. You can introduce a new infrastructure service (e.g., AzureStorage → AWS S3) without touching the application layer.
3. Liskov Substitution Principle (LSP): Objects should be replaceable with instances of their subtypes without altering correctness. Interface-driven design ensures you can substitute one implementation (e.g., `FakeOrderRepository` in tests) for another (e.g., `EfOrderRepository`) without breaking your app. Enforced naturally via DI in `Startup.cs` (or `Program.cs` in minimal APIs).
4. Interface Segregation Principle (ISP): Clients should not be forced to depend on methods they do not use. Interfaces are lean and focused. Example: `IUserNotifier` with only `SendWelcomeEmail`, rather than bloating it with unrelated user ops. Keeps services testable and decoupled from unrelated responsibilities.
5. Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules. Both should depend on abstractions. The `Application` layer depends on interfaces for repositories, email, storage, etc. Those interfaces are implemented by lower layers (`Persistence`, `Infrastructure`). Your domain rules never depend on EF Core, Serilog, Redis, etc.

#### ⚖️ Trade-Offs of Clean Architecture with DDD
| Pros (🟢)                                              | Cons (🔴)                                         | Cautions (🟡)                                      |
|-------------------------------------------------------|--------------------------------------------------|---------------------------------------------------|
| Ideal for **complex business domains** where modeling the domain accurately matters. | Can be **overkill for simple CRUD apps** or prototypes that don’t require deep domain logic. | Introduces **more projects and files**, increasing complexity and setup overhead. |
| Encourages **long-term maintainability** and adaptability as requirements evolve. | The initial learning curve is steeper, especially for teams new to layered architecture or DDD. | Requires discipline in enforcing boundaries and dependency rules, or it can degrade into a tangled codebase. |
| Promotes **testability and separation of concerns** by isolating business logic from infrastructure and UI. | More upfront design and architecture effort can slow down early development speed. | Junior developers might struggle without proper mentoring or clear guidelines. |

#### ❌Anti Patterns to Avoid
- Putting EF DbContext in Domain
- Putting logic in Controllers
- Injecting DbContext directly into use case handlers
- Bloated interfaces (violates ISP)
- Infrastructure referencing Application layer


---

## 📊 Comparison of C#/.NET Project Structures (BONUS)

| Structure Name             | Ideal For                                | Complexity | Scalable? | Testing-Friendly | Typical Projects or Layout                          |
|---------------------------|------------------------------------------|------------|-----------|------------------|-----------------------------------------------------|
| **Single-Project (Monolith)** | Tiny apps, quick demos                     | ⭐          | ❌ No     | 🚫 Limited       | `MyApp.csproj` (everything in one)                  |
| **Basic Multi-Project**   | Small/medium apps, learning architecture | ⭐⭐         | ⚠️ Somewhat | ✅ Yes           | `API`, `Core`, `Data`, `Worker`, `Tests`           |
| **Clean Architecture**    | Enterprise apps, domain-driven design    | ⭐⭐⭐⭐       | ✅ Yes     | ✅✅ High         | `Domain`, `Application`, `Infrastructure`, `API`, `Tests`, `CrossCutting` |
| **Onion Architecture**    | Business-rule-focused layered apps       | ⭐⭐⭐⭐       | ✅ Yes     | ✅✅ High         | Similar to Clean: `Core`, `App`, `Infra`, `UI`     |
| **Hexagonal (Ports & Adapters)** | Highly decoupled I/O-bound systems        | ⭐⭐⭐⭐⭐     | ✅ Yes     | ✅✅ High         | `Core`, `Adapters` (Web, DB, Queue, etc.)           |
| **Modular Monolith**      | Apps needing internal module separation  | ⭐⭐⭐⭐       | ✅ Yes     | ✅ Yes           | `Modules/Product`, `Modules/User`, `API`, `Core`   |
| **Plugin-Based**          | Extensible apps, multi-tenant platforms  | ⭐⭐⭐⭐       | ✅ Yes     | ⚠️ Depends       | `Core`, `Plugins`, `Shared`, `Loaders`              |
| **Microservices**         | Large teams, distributed systems         | ⭐⭐⭐⭐⭐⭐     | ✅✅ Very   | ✅✅ High         | Multiple APIs with separate DBs and internal layers |
| **Folder-Based (1-Project)** | Small apps wanting structure             | ⭐          | ❌ No     | ⚠️ Moderate       | Folders: `Controllers/`, `Services/`, `Models/`     |
