# Use the .NET 8.0 SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["backend/backend/backend.csproj", "backend/"]
RUN dotnet restore "backend/backend.csproj"

COPY . .

RUN chmod -R 777 /src/backend/bin/Release/net8.0/backend # Change permissions for the destination directory
# Build and publish the project
FROM build AS publish
WORKDIR /src/backend
RUN dotnet publish "backend.csproj" -c Release -o /app/publish

# Use the runtime image for .NET 8.0
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "backend.dll"]
