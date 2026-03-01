import axios from "axios";

const api = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});
// export const getFolders = async () => {
//   const res = await api.get("/api/folders");
//   return res.data;
// };

export default api;