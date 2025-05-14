export default async function handler(req, res) {
  const blobUrl = "https://fabricdashdata.blob.core.windows.net/exports/nor_data_combined.csv";

  try {
    const response = await fetch(blobUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch CSV from Blob" });
    }

    const text = await response.text();
    res.setHeader("Content-Type", "text/csv");
    res.status(200).send(text);
  } catch (err) {
    console.error("Error fetching CSV from Blob:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}