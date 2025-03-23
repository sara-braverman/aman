import { Client } from '@elastic/elasticsearch';
import customerMapping from '../mappings/customerMapping'
import categoryMapping from '../mappings/categoryMapping';
import productMapping from '../mappings/productMapping';
import cartMapping from '../mappings/cartMapping';

// Initialize the Elasticsearch client with authentication and SSL
export const client = new Client({
    node: 'http://elasticsearch:9200', // Use 'http://localhost:9200' if running outside Docker
    auth: {
        username: 'elastic',
        password: 'your_elastic_password'
    }
});

/**
 * Function to create index mappings for customers, categories, products, and carts.
 * It uses predefined mappings for each index and creates the indices in Elasticsearch.
 */
async function waitForElastic() {
    const maxRetries = 10;
    let attempts = 0;

    while (attempts < maxRetries) {
        try {
            await client.ping();
            console.log('Elasticsearch is up');
            return true;
        } catch (error) {
            attempts++;
            console.log(`Attempt ${attempts} - Elasticsearch is not available yet. Retrying...`);
            await new Promise(res => setTimeout(res, 1000)); // Wait 1 second before retrying
        }
    }
    
    throw new Error('Elasticsearch did not start in time');
}

/**
 * Function to create index mappings for customers, categories, products, and carts.
 * It uses predefined mappings for each index and creates the indices in Elasticsearch.
 */
export async function createMappings() {
    await waitForElastic(); // Wait for Elasticsearch to be available

    try {
        await client.indices.create({
            index: 'customers',
            body: {
                mappings: customerMapping
            }
        })

        await client.indices.create({
            index: 'categories',
            body: {
                mappings: categoryMapping
            }
        });

        await client.indices.create({
            index: 'products',
            body: {
                mappings: productMapping
            }
        });

        await client.indices.create({
            index: 'carts',
            body: {
                mappings: cartMapping
            }
        });

        console.log('Mappings created successfully.');
    } catch (error) {
        console.error('Error creating mappings:', error);
    }
}

