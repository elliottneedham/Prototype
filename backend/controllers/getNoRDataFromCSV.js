const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const getNoRDataFromCSV = async (req, res) => {
  try {
    const results = [];
    const filePath = path.join(__dirname, "..", "data", "NoR.csv");

    // Group map for now (only Early Years included in dataset)
    const groupMapping = {
      "EY 1": "Early Years",
      "EY 2": "Early Years",
      "N 1": "Early Years",
    };

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        // Grouped aggregation
        const grouped = {};

        results.forEach((row) => {
          const year = row.Year;
          const rawGroup = row.Yr_Group?.trim();
          const group = groupMapping[rawGroup];

          if (!group) return; // skip unmatched groups
          const pupils = parseFloat(row.Pupils || "0");

          if (!grouped[year]) grouped[year] = {};
          if (!grouped[year][group]) grouped[year][group] = 0;

          grouped[year][group] += pupils;
        });

        // Format for charting
        const formatted = Object.entries(grouped).map(([year, groups]) => ({
          Year: year,
          ...groups,
        }));

        res.json(formatted);
      });
  } catch (error) {
    console.error("Error reading CSV:", error);
    res.status(500).json({ error: "Failed to read NoR CSV data" });
  }
};

module.exports = getNoRDataFromCSV;