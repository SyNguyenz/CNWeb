# Use the .NET 8.0 SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

# Copy only the project file and restore dependencies
COPY ["backend/backend/backend.csproj", "backend/"]
RUN dotnet restore "backend/backend.csproj"

# Copy the rest of the source code
COPY ["backend/backend/Controllers/", "backend/"]
COPY ["backend/backend/Data/", "backend/"]
COPY ["backend/backend/Migrations/", "backend/"]
COPY ["backend/backend/Models/", "backend/"]
COPY ["backend/backend/Properties/", "backend/"]
COPY ["backend/backend/appsettings.Development.json", "backend/"]
COPY ["backend/backend/appsettings.json", "backend/"]
COPY ["backend/backend/backend.http", "backend/"]
COPY ["backend/backend/Program.cs", "backend/"]
COPY ["backend/backend.sln", "backend/"]

WORKDIR "/src/backend"
RUN dotnet build "backend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "backend.csproj" -c Release -o /app/publish

# Use the runtime image for .NET 8.0
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "backend.dll"]
