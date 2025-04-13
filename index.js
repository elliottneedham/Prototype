console.log("🌐 Server file started like a boss");
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const tedious = require('tedious');
const axios = require('axios');

dotenv.config();

const app = express(); // ✅ only declared once

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ✅ Test route to confirm deployment works
app.get('/test', (req, res) => {
  res.send('Test route is working');
});

// ✅ Add this route underneath the /test route
app.get('/api/nor', async (req, res) => {
  try {
    // TEMPORARY MOCK — Replace this with real Fabric query later
    const fakeData = [
      { Date: '2022', Value: 450 },
      { Date: '2023', Value: 470 },
      { Date: '2024', Value: 490 },
    ];

    res.json(fakeData);
  } catch (error) {
    console.error('❌ Error in /api/nor:', error);
    res.status(500).json({ error: 'Something went wrong fetching NoR data' });
  }
});

// 🧠 Your SQL/data logic routes can go here...

// ✅ Listen
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Fabric API running on http://0.0.0.0:${PORT}`);
});