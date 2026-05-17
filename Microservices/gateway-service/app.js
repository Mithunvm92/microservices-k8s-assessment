const express = require('express');
const axios = require('axios');

const app = express();
const port = 3003;

app.get('/', (req, res) => {
  res.send('Gateway Service Running');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get(
      'http://user-service.default.svc.cluster.local:3000/users'
    );
    res.json(response.data);
  } catch (error) {
    console.error('USERS ERROR:', error.message);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get(
      'http://product-service.default.svc.cluster.local:3001/products'
    );
    res.json(response.data);
  } catch (error) {
    console.error('PRODUCTS ERROR:', error.message);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const response = await axios.get(
      'http://order-service.default.svc.cluster.local:3002/orders'
    );
    res.json(response.data);
  } catch (error) {
    console.error('ORDERS ERROR:', error.message);
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Gateway service running on port ${port}`);
});
