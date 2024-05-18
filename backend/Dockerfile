# Use the .NET 8.0 SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

# Copy only the project file and restore dependencies
COPY ["backend/backend/backend.csproj", "backend/"]
RUN dotnet restore "backend/backend.csproj"

# Copy the rest of the source code
COPY . .

WORKDIR "/src/backend"
RUN dotnet build "backend.csproj" -c Release -o /src/build

FROM build AS publish
RUN dotnet publish "backend.csproj" -c Release -o /src/publish

# Use the runtime image for .NET 8.0
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /src
COPY --from=publish /src/publish .
ENTRYPOINT ["dotnet", "backend.dll"]
