import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";


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
const getMyOrder = asyncHandler(async (req, res) => {
    const orders = await Order.findOne({ user: req.user._id });
    res.json(200).json(orders);
});

// @desc   Get order by Id
// @route  GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = (await Order.findById(req.params.id)).populate('user', 'name email');
    
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// @desc   Update order to paid
// @route  POST /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send("Update order to paid");
});

// @desc   Update order to delivered
// @route  POST /api/orders/:id/deliver
// @access Private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send("Update order to deliver");
});


// @desc   Get all orders
// @route  GET /api/orders/
// @access Private/admin
const getOrders = asyncHandler(async (req, res) => {
    res.send("Get all Orders");
});

export {
    addOrderItems,
    getMyOrder,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
};