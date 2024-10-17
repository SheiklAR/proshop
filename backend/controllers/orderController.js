import asyncHandler from "../middleware/asyncHandler.js";


// @desc   Create New Order
// @route  POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
    res.send("add order items");
});

// @desc   Get logged in user orders
// @route  GET /api/orders/myorders
// @access Private
const getMyOrder = asyncHandler(async (req, res) => {
    res.send("Get My order");
});

// @desc   Get order by Id
// @route  GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    res.send("Get order by Id");
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