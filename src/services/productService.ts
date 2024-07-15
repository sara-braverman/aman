
import { client } from './elasticsearchService';
import { Product } from '../models/product';
import { estypes } from '@elastic/elasticsearch';

const indexName = 'products';

// Utility function to validate and sanitize input
const sanitizeInput = (input: string): string => {
    // Example sanitization: remove potentially dangerous characters
    return input.replace(/[<>]/g, '');
};

// Function to retrieve all products from the Elasticsearch index
export const getAllProducts = async (): Promise<Product[]> => {
    const result = await client.search<Product>({
        index: indexName,
        body: {
            query: {
                match_all: {}
            }
        }
    });
    return result.hits.hits.map(hit => hit._source as Product);
};

// Function to retrieve a product by its SKU from the Elasticsearch index
export const getProductBySku = async (sku: string): Promise<Product | null> => {
    const result = await client.search<Product>({
        index: indexName,
        body: {
            query: {
                term: { sku }
            }
        }
    });
    return result.hits.hits.length ? result.hits.hits[0]._source as Product : null;
};

// Function to create a new product in the Elasticsearch index
export const createProduct = async (newProduct: Product): Promise<void> => {
    // Verify the category exists
    const categoryExists = await client.exists({
        index: 'categories',
        id: newProduct.categoryId
    });

    if (!categoryExists) {
        throw new Error(`Category with id ${newProduct.categoryId} does not exist.`);
    }

    const sanitizedId = sanitizeInput(newProduct.sku);

    await client.index({
        index: indexName,
        id: sanitizedId,
        body: newProduct
    })

    console.log('Product created successfully.');
};

// Function to update an existing product in the Elasticsearch index
export const updateProduct = async (sku: string, updatedProduct: Partial<Product>): Promise<void> => {
    if (updatedProduct.categoryId) {
        // Verify the new category exists
        const categoryExists = await client.exists({
            index: 'categories',
            id: updatedProduct.categoryId
        });

        if (!categoryExists) {
            throw new Error(`Category with id ${updatedProduct.categoryId} does not exist.`);
        }
    }

    const sanitizedId = sanitizeInput(sku);

    await client.update({
        index: indexName,
        id: sanitizedId,
        body: {
            doc: updatedProduct
        }
    });

    console.log('Product updated successfully.');
};

// Function to delete a product from the Elasticsearch index
export const deleteProduct = async (sku: string): Promise<void> => {
    const sanitizedId = sanitizeInput(sku);
    await client.delete({
        index: indexName,
        id: sanitizedId
    });
    console.log('Product deleted successfully.');
};

// Function to search for products in the Elasticsearch index based on a search string
export const searchProducts = async (searchString: string) => {
    const searchWords = searchString.split(' ');

    const query: estypes.QueryDslQueryContainer = {
        bool: {
            should: [
                {
                    multi_match: {
                        query: searchString,
                        fields: ['name'],
                        fuzziness: 'AUTO'
                    }
                },
                {
                    bool: {
                        must: searchWords.map(word => ({
                            match: {
                                description: {
                                    query: word,
                                    operator: 'and',
                                    fuzziness: 'AUTO'
                                }
                            }
                        }))
                    }
                }
            ],
        }
    };

    // Define the search parameters
    const searchParams: estypes.SearchRequest = {
        index: 'products',
        query: query
    };

    const result = await client.search(searchParams);

    return result.hits.hits;
};

