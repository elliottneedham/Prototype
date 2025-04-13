export const getFabricData = async () => {
  const res = await fetch("/api/nor"); // 👈 USE relative path inside Codespaces
  const data = await res.json();
  return data;
};