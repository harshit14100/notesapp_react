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

export const searchbar = async (query: string) => {
  const res = await api.get("/notes", { params: { s: query } });
  return res.data.notes; 
};



export const getDeletedNotes = async () => {
  try {
    const res = await api.get(`/notes?deleted=true`);
    return res.data.notes;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    return [];
  }
};

export const getFavoriteNotes = async () => {
  try {
    const res = await api.get(`/notes?favorite=true`);
    return res.data.notes;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    return [];
  }
};

export const getArchiveNotes = async () => {
  try {
    const res = await api.get(`/notes?archived=true`);
    return res.data.notes;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    return [];
  }
};