const fs = require('fs');
const path = require('path');

const customersFilePath = path.join(__dirname, '../data/customers.json');

const getCustomersData = () => {
    const data = fs.readFileSync(customersFilePath);
    return JSON.parse(data);
};

const saveCustomersData = (data) => {
    fs.writeFileSync(customersFilePath, JSON.stringify(data, null, 4));
};

module.exports = {
    getCustomersData,
    saveCustomersData
};
