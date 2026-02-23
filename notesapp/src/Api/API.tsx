import axios from "axios";

const api = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});
export const getFolders = async () => {
  const res = await fetch("/api/folders");
  return res.json();
};

export default api;