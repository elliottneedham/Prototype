export const getFabricData = async () => {
  const res = await fetch("https://fabric-api-elliott-win.azurewebsites.net/api/nor");
  const data = await res.json();
  return data;
};