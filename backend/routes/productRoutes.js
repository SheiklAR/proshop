import express from "express";
const router = express.Router();
import { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct, createProductReview } from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";



router.route('/').get(getAllProducts).post(protect, admin, createProduct);

router.route('/:id').get(getProduct).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

router.post('/:id/reviews', protect, createProductReview);

export default router;