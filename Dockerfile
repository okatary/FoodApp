FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 7079
EXPOSE 5158
ENV ASPNETCORE_URLS=http://+:5158
 
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["FoodOrdering/FoodOrdering.csproj", "FoodOrdering/"]
RUN dotnet restore "FoodOrdering/FoodOrdering.csproj"
COPY . .
WORKDIR "/src/FoodOrdering"
RUN dotnet build "FoodOrdering.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FoodOrdering.csproj" -c Release -o /app/publish /p:UseAppHost=false
 
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "FoodOrdering.dll"]