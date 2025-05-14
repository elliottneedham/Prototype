export async function fetchNorData() {
const response = await fetch("https://fabric-api-optimise.azurewebsites.net/api/fetch-nor-data");

  if (!response.ok) {
    console.error("Fetch failed:", response.statusText);
    return [];
  }

  const rawData = await response.json();

  const groupMap: Record<string, string> = {
    "EY 1": "Early Years",
    "EY 2": "Early Years",
    "N 1": "Early Years",
    "N 2": "Early Years",
    "Yr R": "Infant",
    "Yr 01": "Infant",
    "Yr 02": "Infant",
    "Yr 03": "Junior",
    "Yr 04": "Junior",
    "Yr 05": "Junior",
    "Yr 06": "Junior",
    "Yr 07": "Secondary",
    "Yr 08": "Secondary",
    "Yr 09": "Secondary",
    "Yr 10": "Secondary",
    "Yr 11": "Secondary",
    "Yr 12": "Post 16",
    "Yr 13": "Post 16",
    "Yr 14": "Post 16",
  };

  const grouped: Record<string, any> = {};

  rawData.forEach((row: any) => {
    const year = row["Year"];
    const yrGroup = row["Yr_Group"];
    const category = groupMap[yrGroup];
    const pupils = parseFloat(row["Pupils"]) || 0;

    if (!year || !category) return;

    if (!grouped[year]) {
      grouped[year] = {
        Year: year,
        "Early Years": 0,
        Infant: 0,
        Junior: 0,
        Secondary: 0,
        "Post 16": 0,
      };
    }

    grouped[year][category] += pupils;
  });

  return Object.values(grouped);
}