FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /src
COPY ["FoodOrdering/FoodOrdering.csproj", "FoodOrdering/"]
COPY Setup.sh Setup.sh

RUN dotnet tool install --global dotnet-ef

RUN dotnet restore "FoodOrdering/FoodOrdering.csproj"
COPY . .
WORKDIR "/src/FoodOrdering/"

RUN /root/.dotnet/tools/dotnet-ef migrations add InitialMigrations

RUN chmod +x ./Setup.sh
CMD /bin/bash ./Setup.sh