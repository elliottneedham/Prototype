import Papa from "papaparse";

const blobUrl = "https://fabricdashdata.blob.core.windows.net/exports/sen_data_combined.csv";

export async function fetchSENData() {
  const response = await fetch(blobUrl);
  const text = await response.text();

  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data;
}