import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productmodel.js";


//@desc   Fetch All Products
//@route  GET /api/products
//@access Public
const getAllProducts = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

    const count = await Product.countDocuments({ ...keyword });

    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
});


//@desc   Fetch a Product
//@route  GET /api/product/:id
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

//@desc   Update Product
//@route  PUT /api/products/:id
//@access Private/admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, user, image, brand, category, countInStock, numReviews } = req.body;

    const product = await Product.findById(req.params.id);

    console.log("product image", product.image);

    if (product) {
        product.name = name;
        product.price = price;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;      
        
        const updateProduct = await product.save();
        res.status(200).json(updateProduct);

    } else {
        res.status(400);
        throw new Error("Resource Not Found");
    }
});

//@desc   Delete Product
//@route  DELETE /api/products/:id
//@access Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    const deleteProduct = await Product.deleteOne({_id: product._id}); // returns boolean

    if (deleteProduct) {
        res.status(200).json("Product Deleted!");
    } else {
        res.status(400);
        throw new Error("Resource Not Found");
    }
});

//@desc   Create New Review
//@route  POST /api/products/:id/reviews
//@access Private
const createProductReview = asyncHandler(async (req, res) => {
    const { comment, rating } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = await product.reviews.find((review) => review.user._id.toString() === req.user._id.toString());

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Already reviewed');
        }

        const review = {
            name: req.user.name,
            comment,
            rating: Number(rating),
            user: req.user._id,
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

        await product.save();

        res.status(201).json({message: 'Review Added'});

    } else {
        res.status(404);
        throw new Error("Resource Not Found");
    };

});


//@desc   Get top rated products
//@route  GET /api/products/top
//@access Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);

    res.status(200).json(products);
});

export {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts,
}