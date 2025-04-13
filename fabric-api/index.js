console.log("🌐 Server file started like a boss");

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Mount modular route
app.use('/api/nor', require('./routes/nor')); // Now handled by routes/nor.js

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Fabric API running on http://0.0.0.0:${PORT}`);
});