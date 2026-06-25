const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJiX2lkIjoxMjkyLCJ0IjoyLCJpYXQiOjE3ODIzOTMxMjd9.nXMbzWMaGd8D5-TSY4y5kgln2wvgd3RzrJZInMIhpGQ';

app.post('/graphql', async (req, res) => {
  try {
    const response = await fetch('https://openapi.tapgoods.com/v1/external/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + TOKEN,
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Proxy running on port " + PORT));
