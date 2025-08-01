const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const fetch = require('node-fetch');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { id, products, totalAmount, timestamp, name, phone, address } = req.body;
    const newOrder = new Order({ id, products, totalAmount, timestamp, name, phone, address });

    await newOrder.save();

     // Fetch all device tokens
    const tokensRes = await fetch('http://localhost:5000/api/notifications/tokens');
    const tokens = await tokensRes.json();
console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%Fetched Tokens:%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% is', tokens);

    for (let token of tokens) {
      if (!token.startsWith('ExponentPushToken')) continue;
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: token,
          title: 'New Order Received',
          body: `Order #${id} • ₹${totalAmount}`,
          sound: 'default',
        }),
      });
       const result = await response.json();
  if (result.data && result.data.status === 'ok') {
    console.log(`✅ Notification sent to ${token}`);
  } else {
    console.error(`❌ Failed to send to ${token}`, result);
  }
    }
    
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error });
  }
});

// Fetch all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
});

// Test route for orders
router.get('/test', (req, res) => {
    res.status(200).send('Orders test route working');
  });  
  
  // Delete an order
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedOrder = await Order.findOneAndDelete({ id });
  
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json({ message: 'Order deleted successfully', deletedOrder });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete order', error });
    }
  });

module.exports = router;
