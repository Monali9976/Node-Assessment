const express = require('express');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customerRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api/customers', customerRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
