import { client } from './elasticsearchService';
import { Category } from '../models/category';

const indexName = 'categories';

// Utility function to validate and sanitize input
const sanitizeInput = (input: string): string => {
    // Example sanitization: remove potentially dangerous characters
    return input.replace(/[<>]/g, '');
};

//Service function to create a new category in Elasticsearch
export const createCategory = async (category: Category): Promise<void> => {
    const sanitizedCategoryId = sanitizeInput(category.categoryId);
    await client.index({
        index: indexName,
        id: sanitizedCategoryId,
        body: category,
    });
    console.log('Category created successfully.');
};

//Service function to retrieve a category by its ID from Elasticsearch
export const getCategoryById = async (categoryId: string): Promise<Category | null> => {
    const sanitizedCategoryId = sanitizeInput(categoryId);

    const result = await client.search<Category>({
        index: indexName,
        body: {
            query: {
                term: {
                    categoryId: sanitizedCategoryId
                }
            }
        }
    });
    // Return the first matching category or null if not found.
    return result.hits.hits.length ? result.hits.hits[0]._source as Category : null;
};

//Service function to update an existing category in Elasticsearch
export const updateCategory = async (id: string, category: Partial<Category>): Promise<void> => {
    const sanitizedId = sanitizeInput(id);

    await client.update({
        index: indexName,
        id: sanitizedId,
        body: {
            doc: category,
        },
    });
    console.log('Category updated successfully.');
};

//Service function to delete a category by its ID from Elasticsearch
export const deleteCategory = async (id: string): Promise<void> => {
    const sanitizedId = sanitizeInput(id);

    await client.delete({
        index: indexName,
        id: sanitizedId,
    });
    console.log('Category deleted successfully.');
};

//Service function to retrieve all categories from Elasticsearch
export const getAllCategories = async (): Promise<Category[]> => {
    const result = await client.search({
        index: indexName,
        body: {
            query: {
                match_all: {},
            },
        },
    });
    // Map the search hits to an array of Category objects and return.
    return result.hits.hits.map((hit: any) => hit._source as Category);
};
