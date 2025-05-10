const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch@2
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/download', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.json({ success: false, error: 'Geen URL ontvangen.' });

  try {
    const apiUrl = `https://api.tikwm.com/?url=${encodeURIComponent(url)}`;

    const response = await fetch(apiUrl);
    const result = await response.json();
    if (result.data && result.data.play) {
      res.json({ success: true, downloadUrl: result.data.play });
    } else {
      res.json({ success: false, error: 'Video niet gevonden of fout in API.' });
    }

  } catch (err) {
    console.error(err);
    res.json({ success: false, error: 'Serverfout.' });
  }
});

app.listen(PORT, () => console.log(`Server draait op http://localhost:${PORT}`));
