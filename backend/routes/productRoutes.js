import express from "express";
const router = express.Router();
import { getAllProducts, getProduct } from "../controllers/productController.js";



router.route('/').get(getAllProducts);

router.route('/:id').get(getProduct);

// router.get('/', asyncHandler(async (req, res) => {
//     const products = await Product.find({});
//     res.json(products);
// }));

// router.get('/:id', asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);

//     if (product) {
//         return res.json(product);
//     } else {
//         res.status(404);
//         throw new Error('Resource not Found')
//     }

// }));

export default router