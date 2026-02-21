import api from "./API";

export const createNote = async (
  folderId: string,
  title: string,
  content: string,
) => {
  const res = await api.post("/notes", { folderId, title, content });
  return res.data;
};

export const createFolder = async (name: string) => {
  const res = await api.post("/folders", { name });
  return res.data;
};