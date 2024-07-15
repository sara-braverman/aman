import { Request, Response } from 'express';
import * as productService from '../services/productService';
import { Product } from '../models/product';

//Controller to handle the retrieval of all products
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error getting all products', error: err.message });
    }
};

//Controller to handle the retrieval of a product by its SKU
export const getProductBySku = async (req: Request, res: Response): Promise<void> => {
    try {
        const sku = req.params.sku;
        const product = await productService.getProductBySku(sku);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error getting product', error: err.message });
    }
};

//Controller to handle the creation of a new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const newProduct: Product = req.body;
        await productService.createProduct(newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error creating product', error: err.message });
    }
};

//Controller to handle updating a product by its SKU
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const sku = req.params.sku;
        const updatedProduct: Partial<Product> = req.body;
        await productService.updateProduct(sku, updatedProduct);
        res.json(updatedProduct);
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error updating product', error: err.message });
    }
};

//Controller to handle deleting a product by its SKU
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const sku = req.params.sku;
        await productService.deleteProduct(sku);
        res.status(204).send();
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
};

//Controller to handle searching for products based on a query string
export const searchProducts = async (req: Request, res: Response) => {
    try {
        const searchString = req.query.q as string;

        if (!searchString) {
            return res.status(400).json({ error: 'Query parameter "q" is required' });
        }

        const products = await productService.searchProducts(searchString);
        res.json(products);
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error searching product', error: err.message });
    }
};
