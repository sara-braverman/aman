import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';
import { Category } from '../models/category';

//Controller to handle the creation of a new category.
export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const category: Category = req.body;
        await categoryService.createCategory(category);
        res.status(201).json(category);
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error creating category', error: err.message });
    }
};

//Controller to handle the retrieval of a category by its ID
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryId = req.params.categoryId;
        const category = await categoryService.getCategoryById(categoryId);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error getting category', error: err.message });
    }
};

//Controller to handle updating a category by its ID.
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryId = req.params.categoryId;
        const categoryUpdates: Partial<Category> = req.body;
        await categoryService.updateCategory(categoryId, categoryUpdates);
        res.json(categoryUpdates);
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error updating category', error: err.message });
    }
};

//Controller to handle deleting a category by its ID
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryId = req.params.categoryId;
        await categoryService.deleteCategory(categoryId);
        res.status(204).send();
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error deleting category', error: err.message });
    }
};

//Controller to handle the retrieval of all categories
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error getting all categories', error: err.message });
    }
};
