
import { client } from './elasticsearchService';
import { Customer } from '../models/customer';

const indexName = 'customers';

// Utility function to validate and sanitize input
const sanitizeInput = (input: string): string => {
    // Example sanitization: remove potentially dangerous characters
    return input.replace(/[<>]/g, '');
};

//Service function to retrieve all customers from Elasticsearch
export const getAllCustomers = async (): Promise<Customer[]> => {
    const result = await client.search<Customer>({
        index: indexName,
        body: {
            query: {
                match_all: {}
            }
        }
    });
    // Map the search hits to an array of Customer objects and return.
    return result.hits.hits.map(hit => hit._source as Customer);
};

//Service function to retrieve a customer by ID.
export const getCustomerById = async (id: string): Promise<Customer | null> => {
    const sanitizedId = sanitizeInput(id);

    const result = await client.search<Customer>({
        index: indexName,
        body: {
            query: {
                term: {
                    customerId: sanitizedId
                }
            }
        }
    });
    // Return the first result if found, otherwise return null.
    return result.hits.hits.length ? result.hits.hits[0]._source as Customer : null;
};

//Service function to create a new customer
export const createCustomer = async (newCustomer: Customer): Promise<void> => {
    const sanitizedCustomerId = sanitizeInput(newCustomer.customerId);

    await client.index({
        index: indexName,
        id: sanitizedCustomerId,
        body: newCustomer
    });

    console.log('Customer created successfully.');
};

//Service function to update an existing customer
export const updateCustomer = async (id: string, updatedCustomer: Partial<Customer>): Promise<void> => {
    const sanitizedId = sanitizeInput(id);

    await client.update({
        index: indexName,
        id: sanitizedId,
        body: {
            doc: updatedCustomer
        }
    });

    console.log('Customer updated successfully.');
};

//Service function to delete a customer by ID
export const deleteCustomer = async (id: string): Promise<void> => {
    const sanitizedId = sanitizeInput(id);
    await client.delete({
        index: indexName,
        id: sanitizedId
    });
    console.log('Customer deleted successfully.');
};
