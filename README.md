# FoodApp
How to run:

1. cd into FoodApp directory
2. Run docker-compose up --build
3. Go to localhost:300
4. Register an account and start creating an order. You should have an initial $1000 credit.
5. Use the following APIs to change order status. (Note these are GET requests but they require a bearer token. Can be fetched from the network tab.)
    1. http://localhost:5158/api/orders/setOrderReady - Should be triggered by the restaurant
    2. http://localhost:5158/api/orders/setOrderPickedUp - Should be triggered by the delivery pilot
    3. http://localhost:5158/api/orders/setOrderCompleted - Should be triggered by the delivery pilot upon completion

