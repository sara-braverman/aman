import express from 'express';
import * as customerController from '../controllers/customerController';

const router = express.Router();

router.get('/', customerController.getAllCustomers);
router.get('/:customerId', customerController.getCustomerById);
router.post('/', customerController.createCustomer);
router.put('/:customerId', customerController.updateCustomer);
router.delete('/:customerId', customerController.deleteCustomer);

export default router;
