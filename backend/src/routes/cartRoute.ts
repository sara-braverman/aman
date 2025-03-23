import express from 'express';
import * as cartController from '../controllers/cartController';

const router = express.Router();

router.get('/', cartController.getAllCarts);
router.post('/:cartId/items', cartController.fillCart);
router.put('/:cartId/items/:productId', cartController.updateProductQuantity);
router.get('/top-selling', cartController.getTopSellingProducts);

export default router;
