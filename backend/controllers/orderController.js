import Stripe from "stripe";
import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import { config } from "dotenv";
config()

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// @desc   Create New Order
// @route  POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    console.log("orderItems",orderItems)
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order Items');
    } else {
        const order = new Order({
            orderItems: orderItems.map((item) => ({
                ...item,
                product: item._id, // Mapping _id as product
                _id: undefined, // Removing _id for the new order
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder)
    }

});

// @desc   Get logged in user orders
// @route  GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
});

// @desc   Get order by Id
// @route  GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await (Order.findById(req.params.id)).populate('user', 'name email');
    
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// @desc   Update order to paid
// @route  PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        }
    
        const updateOrder = await order.save();

        res.status(200).json(updateOrder);
    }
});

// @desc   Update order to delivered
// @route  PUT /api/orders/:id/deliver
// @access Private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelivered = true,
        order.deliveredAt = Date.now();
        
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } else {
        res.status(400);
        throw new Error("Order Not Found");
        
    }
});


// @desc   Get all orders
// @route  GET /api/orders/
// @access Private/admin
const getOrders = asyncHandler(async (req, res) => {
    const allOrders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(allOrders);
});


// STRIPE PAYMENT INTENT    
const createPaymentIntent = asyncHandler(async (req, res) => {
    await console.log("amount", req.body.amount);
    const amount = Math.round(req.body.amount * 100);
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "usd",
            amount: amount,
        });
        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(400).json({ message: error.message });
        
    }
})

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
    createPaymentIntent,
};