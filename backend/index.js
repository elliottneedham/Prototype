const express = require('express');
const cors = require('cors'); // ← import this
const app = express();
const port = process.env.PORT || 4000;

app.use(cors()); // ← ADD THIS LINE
app.use(express.json());

// existing routes
const norRoute = require('./routes/nor');
app.use('/api/nor', norRoute);

app.listen(port, () => {
  console.log(`🚀 Fabric API running on http://0.0.0.0:${port}`);
});