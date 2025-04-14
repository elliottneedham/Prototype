export const getFabricData = async () => {
  const res = await fetch("/api/proxy-nor");
  const data = await res.json();
  return data;
};