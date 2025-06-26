---
title: 'Starting with Dotnet'
description: '.NET CLI'
pubDate: 'Jun 23 2025'
heroImage: '/001-startingwithdotnet.png'
---

# Starting with Dotnet

## Introdcution 
When I decided to start writing about dotnet and `C#`, I asked myself where should I start from. I think when you start, you start with SDK installation then jump into Visual Studio, we are on macbook with M series chip so we are going to use visual studio code, preferably insider edition.

As of today, 23th of June, 2025, when you go to [dotnet download](https://dotnet.microsoft.com/en-us/download) page, you are welcomed with two options that are STS and LTS. STS stands for Standard Term Support while LTS stands for Long Term Support. We can learn more about these at [dotnet lifecycle](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core) page. 

There is two paths to follow while choosing which version you gonna deploy with, first one is using latest LTS verion to deploy so you have 3 years support and second option is always keeping latest STS which is gonna bring 1.5 years of support. Staying on older version is a dangerous game that I won't even go there.

## Checking Version
Lets say you have dotnet 8 and 9 installed like me and you have some nice fancy terminal like [warp](https://www.warp.dev/) or terminal at VS Code. Lets open it and start playing with. If you run `dotnet --info`, you will see something like this, which shows what verson(s) of dotnet is installed
```sh
.NET SDK:
 Version:           9.0.300
 Commit:            15606fe0a8
 Workload version:  9.0.300-manifests.c678e91b
 MSBuild version:   17.14.5+edd3bbf37

Runtime Environment:
 OS Name:     Mac OS X
 OS Version:  15.5
 OS Platform: Darwin
 RID:         osx-arm64
 Base Path:   /usr/local/share/dotnet/sdk/9.0.300/

.NET workloads installed:
There are no installed workloads to display.
Configured to use loose manifests when installing new manifests.

Host:
  Version:      9.0.5
  Architecture: arm64
  Commit:       e36e4d1a8f

.NET SDKs installed:
  8.0.409 [/usr/local/share/dotnet/sdk]
  9.0.300 [/usr/local/share/dotnet/sdk]

.NET runtimes installed:
  Microsoft.AspNetCore.App 8.0.16 [/usr/local/share/dotnet/shared/Microsoft.AspNetCore.App]
  Microsoft.AspNetCore.App 9.0.5 [/usr/local/share/dotnet/shared/Microsoft.AspNetCore.App]
  Microsoft.NETCore.App 8.0.16 [/usr/local/share/dotnet/shared/Microsoft.NETCore.App]
  Microsoft.NETCore.App 9.0.5 [/usr/local/share/dotnet/shared/Microsoft.NETCore.App]

Other architectures found:
  None

Environment variables:
  Not set

global.json file:
  Not found

Learn more:
  https://aka.ms/dotnet/info

Download .NET:
  https://aka.ms/dotnet/download
```

## Creating things with Dotnet CLI
If we run `dotnet new` we can see small help like info
```sh
The 'dotnet new' command creates a .NET project based on a template.

Common templates are:
Template Name   Short Name  Language    Tags                  
--------------  ----------  ----------  ----------------------
Blazor Web App  blazor      [C#]        Web/Blazor/WebAssembly
Class Library   classlib    [C#],F#,VB  Common/Library        
Console App     console     [C#],F#,VB  Common/Console        

An example would be:
   dotnet new console

Display template options with:
   dotnet new console -h
Display all installed templates with:
   dotnet new list
Display templates available on NuGet.org with:
   dotnet new search web
```

I will not show all possible parameters, but there one thing I want to show is that you can get `help` by running command with `--help` most of the time. For example you want t ocreate console application with `dotnet new console` but not sure what else you can do with, you can run `dotnet new console --help` and see the following output
```sh
Console App (C#)
Author: Microsoft
Description: A project for creating a command-line application that can run on .NET on Windows, Linux and macOS

Usage:
  dotnet new console [options] [template options]

Options:
  -n, --name <name>       The name for the output being created. If no name is specified, the name of the output directory is used.
  -o, --output <output>   Location to place the generated output.
  --dry-run               Displays a summary of what would happen if the given command line were run if it would result in a template creation.
  --force                 Forces content to be generated even if it would change existing files.
  --no-update-check       Disables checking for the template package updates when instantiating a template.
  --project <project>     The project that should be used for context evaluation.
  -lang, --language <C#>  Specifies the template language to instantiate.
  --type <project>        Specifies the template type to instantiate.

Template options:
  -f, --framework <net8.0|net9.0>  The target framework for the project.
                                   Type: choice
                                     net9.0  Target net9.0
                                     net8.0  Target net8.0
                                   Default: net9.0
  --langVersion <langVersion>      Sets the LangVersion property in the created project file
                                   Type: text
  --no-restore                     If specified, skips the automatic restore of the project on create.
                                   Type: bool
                                   Default: false
  --use-program-main               Whether to generate an explicit Program class and Main method instead of top-level statements.
                                   Type: bool
                                   Default: false
  --aot                            Whether to enable the project for publishing as native AOT.
                                   Type: bool
                                   Default: false

To see help for other template languages (F#, VB), use --language option:
   dotnet new console -h --language F#
```

## Other CLI Commands
Lets say you create a project from scratch, or clone a project from version control. These are some options with dotnet cli to get into engagement with source code.

| Command            | Purpose                             |
| ------------------ | ----------------------------------- |
| `dotnet restore`   | Restore project dependencies        |
| `dotnet build`     | Compile the app                     |
| `dotnet run`       | Build and run in one go             |
| `dotnet clean`     | Remove build outputs                |
| `dotnet test`      | Run test projects                   |
| `dotnet watch run` | Auto-rebuild & rerun on file change |

<em>PS: For more, please run `dotnet --help` to find about more you can do with dotnet</em>

## Creating a Solution with Projects
You probably would use `-n` and/or `-o` with dotnet new. Lets go a journey together about setting an API project with Application, Domain, Infrastructure, Persistance layers with a solution file. For this lets create a new TestProject folder and start putting things inside

```md
1. `mkdir TestProject` to create TestProject folder and `cd TestProject` to get into it
2. `dotnet new sln -f slnx -n testproject` will create `testproject.slnx` solution file
3. We are going to run the following commands to create needed projects
    - `dotnet new webapi -n testproject.webapi  --use-controllers`
    - `dotnet new classlib -n testproject.application`
    - `dotnet new classlib -n testproject.domain`
    - `dotnet new classlib -n testproject.infrastructure`
    - `dotnet new classlib -n testproject.persistance`
4. We are going to add all projects to solution via 
    - `dotnet sln testproject.slnx add testproject.webapi/testproject.webapi.csproj`
    - `dotnet sln testproject.slnx add testproject.application/testproject.application.csproj`
    - `dotnet sln testproject.slnx add testproject.domain/testproject.domain.csproj`
    - `dotnet sln testproject.slnx add testproject.infrastructure/testproject.infrastructure.csproj`
    - `dotnet sln testproject.slnx add testproject.persistance/testproject.persistance.csproj`
5. We are going add correct references to each project via running the following commands
    - `dotnet add testproject.infrastructure/testproject.infrastructure.csproj reference testproject.domain/testproject.domain.csproj`
    - `dotnet add testproject.persistance/testproject.persistance.csproj reference testproject.infrastructure/testproject.infrastructure.csproj`
    - `dotnet add testproject.application/testproject.application.csproj reference testproject.persistance/testproject.persistance.csproj`
    - `dotnet add testproject.webapi/testproject.webapi.csproj reference testproject.application/testproject.application.csproj`
6. We are going to do the following installations:
    - AutoMapper to Infrastructure `dotnet add testproject.infrastructure/testproject.infrastructure.csproj package AutoMapper`
    - EntityFramework to Persistance `dotnet add testproject.persistance/testproject.persistance.csproj package Microsoft.EntityFrameworkCore`
    - MediatR to Application `dotnet add testproject.application/testproject.application.csproj package MediatR`
```

If we go over what we have done, we create a folder and get into it at `1`. Created a solution file at `2`. We created a webapi at the 1th point of `3` and created supporting layers as class library at other points. At `4`, we added all projects to solution so we can have solution view. At this point, if you open the `TestProject` folder with `vs code` and if you have `C# Dev Kit` extension installed, you can view it as `solution`. We created a logical references in a structured way at `5` and installed some nuget dependencies at `6`.

## Bonus Commands
```md
- `dotnet new globaljson` to set dotnet version for folder
- `dotnet new gitignore` to create gitignore file for the repo
- `dotnet new editorconfig` to create editor config file
- `dotnet tool` to work with tools that extends .Net Experience
- `dotnet dev-certs` to manage developer certificates
- `dotnet watch run` to run application with restart with changes
```
