const { getCustomersData, saveCustomersData } = require('../models/customerModel');

// List customers with search and pagination
const listCustomers = (req, res) => {
    const { first_name, last_name, city, page = 1, limit = 10 } = req.query;
    let customers = getCustomersData();

    if (first_name) {
        customers = customers.filter(customer => customer.first_name.toLowerCase().includes(first_name.toLowerCase()));
    }
    if (last_name) {
        customers = customers.filter(customer => customer.last_name.toLowerCase().includes(last_name.toLowerCase()));
    }
    if (city) {
        customers = customers.filter(customer => customer.city.toLowerCase().includes(city.toLowerCase()));
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const resultCustomers = customers.slice(startIndex, endIndex);

    res.json(resultCustomers);
};

// Get single customer by id
const getCustomerById = (req, res) => {
    const id = parseInt(req.params.id);
    const customers = getCustomersData();
    const customer = customers.find(c => c.id === id);

    if (customer) {
        res.json(customer);
    } else {
        res.status(404).json({ message: 'Customer not found' });
    }
};

// List all unique cities with number of customers
const listUniqueCities = (req, res) => {
    const customers = getCustomersData();
    const cityCount = {};

    customers.forEach(customer => {
        if (cityCount[customer.city]) {
            cityCount[customer.city]++;
        } else {
            cityCount[customer.city] = 1;
        }
    });

    res.json(cityCount);
};

// Add a new customer with validation
const addCustomer = (req, res) => {
    const { first_name, last_name, city, company } = req.body;
    if (!first_name || !last_name || !city || !company) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const customers = getCustomersData();
    const cityExists = customers.some(customer => customer.city === city);
    const companyExists = customers.some(customer => customer.company === company);

    if (!cityExists || !companyExists) {
        return res.status(400).json({ message: 'City or company does not exist' });
    }

    const newId = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;
    const newCustomer = { id: newId, first_name, last_name, city, company };

    customers.push(newCustomer);
    saveCustomersData(customers);

    res.status(201).json(newCustomer);
};

module.exports = {
    listCustomers,
    getCustomerById,
    listUniqueCities,
    addCustomer
};
