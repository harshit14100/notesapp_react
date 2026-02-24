import api from "../Api/API";

export const DeleteNote = async (id: string) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};

export const DeleteFolder = async (id: string) => {
  const res = await api.delete(`/folders/${id}`);
  return res.data;
};