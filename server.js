require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '.')));

// Environment variables
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

// Subscribe API endpoint
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    // Call Beehiiv API
    const response = await fetch(`https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEEHIIV_API_KEY}`
      },
      body: JSON.stringify({
        email: email,
        utm_source: 'vectorflux-website',
        referring_site: 'vectorflux.com',
        double_opt_in: false
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      // Check for specific error codes
      if (data.errors && data.errors.some(err => err.code === 'already_subscribed')) {
        return res.status(409).json({ message: 'already_subscribed' });
      }
      
      return res.status(response.status).json({ 
        message: data.message || 'Subscription failed',
        errors: data.errors
      });
    }
    
    res.status(200).json({ message: 'Subscription successful', data });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 