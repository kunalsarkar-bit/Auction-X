const express = require('express');
const { getCustomers, deleteCustomer, getAllFeedback } = require('../../controllers/SellAnItemControllers/adminControllers'); 
const AdminRoutes = express.Router();


//-------------------Customers-------------------//


// Route to get all customers
AdminRoutes.get('/customers', getCustomers);
// Route to delete a customer
AdminRoutes.delete('/customers/:id', deleteCustomer);


//-------------------Feedback-------------------//


// GET endpoint to fetch all feedback entries
AdminRoutes.get('/feedback', getAllFeedback);



module.exports = AdminRoutes;
