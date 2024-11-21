const express = require('express');
const { Getuser, deletUser } = require('../../controllers/LoginControllers/AdminController.js');
const { isAdmin } = require('../../middleware/LoginMiddleware/verifyToken.js');
const {getTotalRevenue} = require('../../controllers/SellAnItemControllers/adminControllers.js')
const AdminLoginRoutes = express.Router();


//-------------------LOGIN-CRUD------------------//


// GET endpoint to get all the users
AdminLoginRoutes.get('/getuser', Getuser);

// GET endpoint to delete a user by ID
AdminLoginRoutes.delete('/delet/:id', isAdmin, deletUser);

AdminLoginRoutes.get('/total-revenue', getTotalRevenue);



module.exports = AdminLoginRoutes;
