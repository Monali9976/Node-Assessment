const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.listCustomers);
router.get('/:id', customerController.getCustomerById);
router.get('/cities/unique', customerController.listUniqueCities);
router.post('/', customerController.addCustomer);

module.exports = router;
