import express from 'express';
import { getCustomers, getCustomerById, getCustomerMetrics, generateInsight } from '../controllers/CustomerController';

const router = express.Router();

router.get('/overview/metrics', getCustomerMetrics);
router.get('/:id', getCustomerById);
router.post('/:id/generate-insight', generateInsight);
router.get('/', getCustomers);

export default router;
