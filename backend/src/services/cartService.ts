import { client } from './elasticsearchService';
import { Cart, CartItem } from '../models/cart';

const cartIndexName = 'carts';
const productIndexName = 'products';
const customerIndexName = 'customers';

interface TopProduct {
    productId: string;
    totalQuantitySold: number;
}

// Utility function to validate and sanitize input
const sanitizeInput = (input: string): string => {
    return input.replace(/[<>]/g, '');
};

// Function to retrieve all carts from the Elasticsearch index
export const getAllCarts = async (): Promise<Cart[]> => {
    const result = await client.search<Cart>({
        index: cartIndexName,
        body: {
            query: {
                match_all: {}
            }
        }
    });
    return result.hits.hits.map(hit => hit._source as Cart);
};

// Function to add a product to a cart
export const fillCartWithProduct = async (cartId: string, customerId: string, productId: string, quantity: number): Promise<void> => {
    const sanitizedCartId = sanitizeInput(cartId);
    const sanitizedCustomerId = sanitizeInput(customerId);
    const sanitizedProductId = sanitizeInput(productId);

    // Verify customer exists
    const customerExists = await client.exists({
        index: customerIndexName,
        id: sanitizedCustomerId
    });

    if (!customerExists) {
        throw new Error(`Customer with id ${sanitizedCustomerId} does not exist.`);
    }

    // Verify product exists
    const productExists = await client.exists({
        index: productIndexName,
        id: sanitizedProductId
    });

    if (!productExists) {
        throw new Error(`Product with id ${sanitizedProductId} does not exist.`);
    }

    // Get the cart or create a new one
    let cart: Cart | null = null;
    const cartExists = await client.exists({
        index: cartIndexName,
        id: sanitizedCartId
    });

    if (cartExists) {
        const cartResult = await client.get({
            index: cartIndexName,
            id: sanitizedCartId
        });
        cart = cartResult._source as Cart;
    } else {
        cart = { cartId: sanitizedCartId, customerId: sanitizedCustomerId, items: [] };
    }

    // Check if the product is already in the cart
    const itemExists = cart.items.some(item => item.productId === sanitizedProductId);

    if (itemExists) {
        throw new Error(`Product with id ${productId} is already in the cart.`);
    }

    // Add the product to the cart
    cart.items.push({ productId: sanitizedProductId, quantity });

    // Index the updated cart
    await client.index({
        index: cartIndexName,
        id: sanitizedCartId,
        body: cart,
    });

    console.log('Cart filled with product successfully.');
};

// Function to change the quantity of a product in a cart
export const changeProductQuantity = async (cartId: string, productId: string, newQuantity: number): Promise<void> => {
    const sanitizedCartId = sanitizeInput(cartId);
    const sanitizedProductId = sanitizeInput(productId);

    // Get the cart
    const cartResult = await client.get({
        index: cartIndexName,
        id: sanitizedCartId
    });

    const cart = cartResult._source as Cart;

    // Find the product in the cart
    const itemIndex = cart.items.findIndex(item => item.productId === sanitizedProductId);

    if (itemIndex === -1) {
        throw new Error(`Product with id ${sanitizedProductId} not found in cart.`);
    }

    // Update the quantity
    cart.items[itemIndex].quantity = newQuantity;

    // Index the updated cart
    await client.index({
        index: cartIndexName,
        id: sanitizedCartId,
        body: cart,
        refresh: 'wait_for'
    });

    console.log('Product quantity updated successfully.');
};

// Function to get the 3 top-selling products based on the quantity sold
export const getTopSellingProducts = async (): Promise<TopProduct[]> => {
    const result: any = await client.search({
        index: cartIndexName,
        body: {
            "size": 0,
            "query": {
                "match_all": {}
            },
            "aggs": {
                "top_products": {
                    "nested": {
                        "path": "items"
                    },
                    "aggs": {
                        "group_by_productId": {
                            "terms": {
                                "field": "items.productId",
                                "size": 3,  // Get the top 3 products
                                "order": {
                                    "total_quantity_sold": "desc"
                                }
                            },
                            "aggs": {
                                "total_quantity_sold": {
                                    "sum": {
                                        "field": "items.quantity"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    // Parse the result and extract the top products
    const topProducts: TopProduct[] = result.aggregations?.top_products?.group_by_productId?.buckets.map((bucket: any) => {
        return {
            productId: bucket.key,
            totalQuantitySold: bucket.total_quantity_sold?.value || 0
        };
    }) || [];

    return topProducts;
};

