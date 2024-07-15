import { Request, Response } from 'express';
import * as customerService from '../services/customerService';
import { Customer } from '../models/customer';

//Controller to handle the retrieval of all customers
export const getAllCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
        const customers = await customerService.getAllCustomers();
        res.json(customers);
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error getting all customers', error: err.message });
    }
};

//Controller to handle the retrieval of a customer by its ID
export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
    try {
        const customerId = req.params.customerId;
        const customer = await customerService.getCustomerById(customerId);
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error getting customer', error: err.message });
    }
};

//Controller to handle the creation of a new customer
export const createCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
        const newCustomer: Customer = req.body;
        await customerService.createCustomer(newCustomer);
        res.status(201).json(newCustomer);
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error creating customer', error: err.message });
    }
};

//Controller to handle updating a customer by its ID
export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
        const customerId = req.params.customerId;
        const updatedCustomer: Partial<Customer> = req.body;
        await customerService.updateCustomer(customerId, updatedCustomer);
        res.json(updateCustomer);
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error updating customer', error: err.message });
    }
};

//Controller to handle deleting a customer by its ID
export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
        const customerId = req.params.customerId;
        await customerService.deleteCustomer(customerId);
        res.status(204).send();
    } catch (error) {
        const err = error as Error; 
        console.error('Error:', err); 
        res.status(500).json({ message: 'Error deleting customer', error: err.message });
    }
};
