import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productmodel.js";


//@desc   Fetch All Products
//@route  GET /api/products
//@access Public
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});


//@desc   Fetch All Products
//@route  GET /api/products
//@access Public
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product)
    } else {
        res.status(404);
        throw new Error(`Resource not Found`);
    }
});

export {getAllProducts, getProduct}