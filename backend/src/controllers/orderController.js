const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const createOrder = async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;
    
    let totalAmount = 0;

    for (const item of items) {

      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: "Not enough stock" });
      }

      product.stock -= item.quantity;
      await product.save();

      totalAmount += product.price * item.quantity;
    }

    const order = new Order({
      items,
      totalAmount,
      paymentMethod
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("items.product", "name price sku");

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createOrder,
  getOrders
};