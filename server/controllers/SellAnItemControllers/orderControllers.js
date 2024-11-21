// controllers/orderController.js
const Order = require("../../models/SellAnItemSchema/orderSchema");

// CREATE: Add a new order
exports.createOrder = async (req, res) => {
  const {
    title,
    name,
    userEmail,
    sellerEmail,
    category,
    images,
    biddingStartPrice,
    highestBid,
    phoneNo,
    address,
  } = req.body;

  // Check required fields
  if (
    !title ||
    !name ||
    !userEmail ||
    !sellerEmail ||
    !category ||
    !images ||
    !biddingStartPrice ||
    !phoneNo ||
    !address
  ) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided" });
  }

  try {
    const newOrder = new Order({
      title,
      name,
      userEmail,
      sellerEmail,
      category,
      images,
      biddingStartPrice,
      highestBid,
      phoneNo,
      address,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ error: "Failed to create order", details: error.message });
  }
};

// READ: Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// READ: Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};
