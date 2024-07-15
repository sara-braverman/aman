import { Request, Response } from 'express';
import * as cartService from '../services/cartService';

//Controller to handle the retrieval of all carts.
export const getAllCarts = async (req: Request, res: Response): Promise<void> => {
    try {
        const carts = await cartService.getAllCarts();
        res.status(200).json(carts);
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error getting all carts', error: err.message });
    }
};

//Controller to handle filling a cart with a product
export const fillCart = async (req: Request, res: Response): Promise<void> => {
    const { cartId } = req.params;
    const { customerId, productId, quantity } = req.body;

    try {
        await cartService.fillCartWithProduct(cartId, customerId, productId, quantity);
        res.status(200).send('Cart filled with product successfully.');
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error filling cart', error: err.message });
    }
};

//Controller to handle updating the quantity of a product in a cart
export const updateProductQuantity = async (req: Request, res: Response): Promise<void> => {
    const { cartId, productId } = req.params;
    const { newQuantity } = req.body;

    try {
        await cartService.changeProductQuantity(cartId, productId, newQuantity);
        res.status(200).send('Product quantity updated successfully.');
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error updating product quantity', error: err.message });
    }
};

//Controller to handle the retrieval of 3 top-selling products
export const getTopSellingProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const topSellingProducts = await cartService.getTopSellingProducts();
        res.status(200).json(topSellingProducts);
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error getting top selling products', error: err.message });
    }
};
