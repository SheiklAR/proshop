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

//@desc   Create New Product
//@route  POST /api/products
//@access Private/admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Some Brand',
        category: 'Some CAtegory',
        countInStock: 0,
        numReviews: 2,
        description: "description"
    })

    const createdProduct = await product.save();
    res.status(201).json(createProduct);
});


export {getAllProducts, getProduct, createProduct}