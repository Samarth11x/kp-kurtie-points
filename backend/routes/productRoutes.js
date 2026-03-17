import express from 'express';
import { body } from 'express-validator';
import {
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

const productValidators = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('slug').trim().notEmpty().withMessage('Slug is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('image').trim().notEmpty().withMessage('Image URL is required'),
  body('stockCount').isInt({ min: 0 }).withMessage('Stock count must be 0 or more'),
];

router.route('/').get(getProducts).post(protect, admin, productValidators, validateRequest, createProduct);
router.route('/slug/:slug').get(getProductBySlug);
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, productValidators, validateRequest, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
