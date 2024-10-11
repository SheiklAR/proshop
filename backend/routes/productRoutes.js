import express from "express";
const router = express.Router();
import Product from "../models/productmodel.js";
import asyncHandler from "../middleware/asyncHandler.js";


router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    }

    res.status(404).json({ message: 'Product not Found' });
}));

export default router