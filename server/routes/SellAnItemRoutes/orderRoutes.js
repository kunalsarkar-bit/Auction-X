// routes/OrderRoutes.js
const express = require('express');
const OrderRoutes = express.Router();
const orderController = require('../../controllers/SellAnItemControllers/orderControllers');

// Route to create a new order
OrderRoutes.post('/', orderController.createOrder);

// Route to get all orders
OrderRoutes.get('/', orderController.getAllOrders);

// Route to get a specific order by ID
OrderRoutes.get('/:id', orderController.getOrderById);



module.exports = OrderRoutes;
