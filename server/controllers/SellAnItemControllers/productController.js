const Product = require("../../models/SellAnItemSchema/Product");
const Feedback = require("../../models/SellAnItemSchema/feedbackSchema");
const cloudinary = require("../../utlis/SellAnItemUtils/cloudinaryConfig");
const isWithinOneHourOfBidding = require("../../middleware/SellAnItemMiddleware/isWithinOneHourOfBidding");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    product.cloudinary_public_id = req.body.cloudinary_public_id;
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "Error creating product" });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: "Error fetching products" });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: "Error fetching product" });
  }
};

// Get products by email
const getProductsByEmail = async (req, res) => {
  try {
    const products = await Product.find({ email: req.params.email }); // Assuming Product model has an 'email' field
    if (products.length === 0)
      return res
        .status(404)
        .json({ error: "No products found for this email" });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: "Error fetching products" });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if it's within 1 hour of the bidding start time
    const biddingStartDateTime = new Date(
      `${product.biddingStartDate}T${product.biddingStartTime}`
    );
    if (isWithinOneHourOfBidding(biddingStartDateTime)) {
      return res
        .status(403)
        .json({
          message:
            "You cannot update or delete the product within 1 hour of bidding.",
        });
    }

    // Prevent updating the bidding date or time after it's initially set
    if (req.body.biddingStartDate || req.body.biddingStartTime) {
      return res
        .status(400)
        .json({
          message:
            "Bidding start date and time cannot be changed after submission.",
        });
    }

    // Store the current images and new images for updating
    const currentImages = product.images.map((image) => image.public_id);
    const newImages = req.body.images.map((image) => image.public_id);

    // Determine images to delete
    const imagesToDelete = currentImages.filter(
      (id) => !newImages.includes(id)
    );

    // Delete images from Cloudinary and the database
    await Promise.all(
      imagesToDelete.map(async (publicId) => {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error(
            `Error deleting image from Cloudinary: ${error.message}`
          );
        }
      })
    );

    // Update other product fields
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category;
    product.mobileNumber = req.body.mobileNumber || product.mobileNumber;
    product.biddingStartPrice =
      req.body.biddingStartPrice || product.biddingStartPrice;

    // Update images
    product.images = req.body.images || product.images;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const biddingStartDateTime = new Date(
      `${product.biddingStartDate}T${product.biddingStartTime}`
    );
    if (isWithinOneHourOfBidding(biddingStartDateTime)) {
      return res
        .status(403)
        .json({
          message: "You cannot delete the product within 1 hour of bidding.",
        });
    }

    // Cloudinary deletion process for multiple images
    const images = product.images; // Assuming `images` is an array of objects
    if (images && images.length > 0) {
      for (const image of images) {
        try {
          const publicId = image.public_id;
          console.log(
            `Attempting to delete Cloudinary image with publicId: ${publicId}`
          );

          const result = await cloudinary.uploader.destroy(publicId);
          console.log("Cloudinary deletion result:", result);

          if (result.result !== "ok") {
            console.error(`Failed to delete Cloudinary image: ${result}`);
          }
        } catch (error) {
          console.error("Error deleting image from Cloudinary:", error);
          return res
            .status(500)
            .json({ message: "Error deleting image from Cloudinary" });
        }
      }
    } else {
      console.warn("No images found for this product");
    }

    // Delete product from the database
    await Product.findByIdAndDelete(req.params.id);
    console.log("Product deleted successfully");
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

//delete product after successfull bidding
// Delete product
const deleteSuccessProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete product from the database
    await Product.findByIdAndDelete(req.params.id);
    console.log("Product deleted successfully");
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

// Delete image// Delete image
const deleteImage = async (req, res) => {
  const { public_id } = req.body;

  if (!public_id) {
    return res
      .status(400)
      .json({ message: "Public ID is required to delete the image" });
  }

  try {
    console.log("Attempting to delete image with public_id:", public_id);

    // Use Cloudinary's uploader destroy method
    const response = await cloudinary.uploader.destroy(public_id);

    if (response.result !== "ok") {
      console.error("Cloudinary deletion response:", response);
      throw new Error("Failed to delete image from Cloudinary");
    }

    res
      .status(200)
      .json({ message: "Image deleted successfully", data: response });
  } catch (error) {
    console.error(
      "Error deleting image from Cloudinary:",
      error.message || error
    );
    res
      .status(400)
      .json({ message: "Error deleting image", error: error.message || error });
  }
};

// Controller for submitting feedback
const submitFeedback = async (req, res) => {
  const { email, name, phone, checkbox_values } = req.body;

  try {
    const feedback = new Feedback({ email, name, phone, checkbox_values });
    await feedback.save();
    res
      .status(201)
      .json({ message: "Feedback submitted successfully!", feedback });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ message: "Error submitting feedback", error });
  }
};

const patchProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const update = {
      tempuseremail: req.body.tempuseremail,
      tempamount: req.body.tempamount,
      tempname: req.body.tempname,
      biddingStartPrice: req.body.biddingStartPrice, // Add biddingStartPrice field
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: update },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.send(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating product" });
  }
};

// Update product status by ID
const updateProductStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status value
    if (!["Active", "Closed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product status updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product status:", error);
    res.status(500).json({ message: "Error updating product status" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByEmail,
  updateProduct,
  deleteProduct,
  deleteImage,
  submitFeedback,
  patchProduct,
  deleteSuccessProduct,
  updateProductStatus,
};
