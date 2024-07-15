import { Client } from '@elastic/elasticsearch';
import customerMapping from '../mappings/customerMapping'
import categoryMapping from '../mappings/categoryMapping';
import productMapping from '../mappings/productMapping';
import cartMapping from '../mappings/cartMapping';

// Initialize the Elasticsearch client
export const client = new Client({
    node: 'http://localhost:9200',
});

/**
 * Function to create index mappings for customers, categories, products, and carts.
 * It uses predefined mappings for each index and creates the indices in Elasticsearch.
 */
export async function createMappings() {
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

