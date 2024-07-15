import express from 'express';
import * as productController from '../controllers/productController';

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.get('/:sku', productController.getProductBySku);
router.post('/', productController.createProduct);
router.put('/:sku', productController.updateProduct);
router.delete('/:sku', productController.deleteProduct);

export default router;
