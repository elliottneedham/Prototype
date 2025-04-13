app.get('/api/nor', async (req, res) => {
  console.log("🟢 /api/nor was hit from frontend");
  try {
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