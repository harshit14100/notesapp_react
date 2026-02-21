import api from "./API";

export const getFolders = async () => {
  const res = await api.get("/folders");
  return res.data.folders;
};

export const getRecentNotes = async () => {
  const res = await api.get("/notes/recent");
  return res.data.recentNotes;
};

export const getNotesByFolder = async (folderId: string) => {
  const res = await api.get("/notes", { params: { folderId } });
  return res.data.notes;
};

export const getNoteById = async (id: string) => {
  const res = await api.get(`/notes/${id}`);
  return res.data.note;
};