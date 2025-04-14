const express = require('express');
const router = express.Router();
const getNoRData = require('../controllers/getNoRData');

router.get('/', async (req, res) => {
  try {
    console.log('🟢 Hitting /api/nor route');
    const data = await getNoRData(); // now it’s a standalone function
    res.json(data);
  } catch (error) {
    console.error('❌ Error fetching NoR data:', error);
    res.status(500).json({ error: 'Failed to fetch NoR data from Fabric SQL' });
  }
});

module.exports = router;