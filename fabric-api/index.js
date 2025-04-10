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

// 🧠 Your SQL/data logic routes can go here...

// ✅ Listen
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Fabric API running on http://0.0.0.0:${PORT}`);
});