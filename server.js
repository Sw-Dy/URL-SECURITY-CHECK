const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/scan', async (req, res) => {
  const url = req.query.url;

  try {
    const response = await fetch(url);
    const headers = response.headers.raw();
    res.json({ headers });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch website details.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
