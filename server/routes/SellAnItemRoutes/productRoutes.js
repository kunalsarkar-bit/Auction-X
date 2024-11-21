const express = require('express');
const productRoutes = express.Router();
const {createProduct,patchProduct,updateProductStatus, deleteSuccessProduct, getAllProducts, getProductsByEmail, getProductById, updateProduct, deleteProduct, deleteImage, submitFeedback } = require('../../controllers/SellAnItemControllers/productController'); 
const checkTimeRestriction = require('../../middleware/SellAnItemMiddleware/checkTimeRestriction');
const handleContactSubmission = require('../../utlis/SellAnItemUtils/ContactUsEmailSender')

//-------------------Product-------------------//

// POST endpoint to create a product
productRoutes.post('/', createProduct);

// GET endpoint to get all products
productRoutes.get('/', getAllProducts);

// GET endpoint to get a product by EMAIL
productRoutes.get('/email/:email', getProductsByEmail);

// GET endpoint to get a product by ID
productRoutes.get('/:id', getProductById);

// PUT endpoint to update a product by ID
productRoutes.put('/:id', checkTimeRestriction, updateProduct);

//status update
productRoutes.patch('/statuspatch/:id', updateProductStatus);

// DELETE endpoint to delete a product by ID
productRoutes.delete('/:id', checkTimeRestriction, deleteProduct);

productRoutes.delete('/deleteSuccessProduct/:id',  deleteSuccessProduct);
// DELETE endpoint to delete a product's cloudinary Image by ID
productRoutes.delete('/delete-image', deleteImage);



//-------------------Feedback-------------------//

// POST endpoint to submit feedback
productRoutes.post('/submit', submitFeedback);



//-------------------Payment-------------------//


productRoutes.patch('/tempdata/:id', patchProduct);


//-------------------Contact-Us-------------------//

productRoutes.post('/contact-us', handleContactSubmission);


module.exports = productRoutes;
