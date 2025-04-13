module.exports = async (req, res) => {
    try {
      console.log("🟢 /api/nor hit");
  
      // Eventually, replace with live SQL query using `tedious` or `axios` to Fabric
      const fakeData = [
        { Date: '2022', Value: 450 },
        { Date: '2023', Value: 470 },
        { Date: '2024', Value: 490 },
      ];
  
      res.json(fakeData);
    } catch (err) {
      console.error('❌ Error in /api/nor:', err);
      res.status(500).json({ error: 'Server error fetching NoR data' });
    }
  };  