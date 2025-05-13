export async function getFabricData() {
  const res = await fetch('https://cuddly-space-chainsaw-x5x9gw4q6pr6h6xjq-4000.app.github.dev/api/nor');

  if (!res.ok) {
    console.error('❌ Failed to fetch NoR data:', res.statusText);
    return [];
  }

  const data = await res.json();
  console.log('📦 Data fetched from backend:', data);
  return data;
}