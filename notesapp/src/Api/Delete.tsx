import api from "../Api/API";

export const DeleteNote = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/notes/${id}`);
    return true;
  } catch {
    return false;
  }
};

export const DeleteFolder = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/folders/${id}`);
    return true;
  } catch {
    return false;
  }
};