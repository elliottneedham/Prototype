// pages/api/proxy-nor.ts
export default async function handler(req, res) {
  try {
    const backendRes = await fetch("https://fabric-api-elliott-win.azurewebsites.net/api/nor");
    const data = await backendRes.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy to Azure API failed" });
  }
}