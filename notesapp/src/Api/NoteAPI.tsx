import type { NotesType } from "../types/types";
import api from "./API";
import toast from "react-hot-toast";

const limit = 10;

type NotePatch = {
  title?: string;
  content?: string;
  isFavorite?: boolean;
  isArchived?: boolean;
  folderId?: string;
};

export const deleteNote = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/notes/${id}`);
    toast.success("Note deleted");
    return true;
  } catch {
    return false;
  }
};

const getNotesByFilter = async (filter: string, page=1): Promise<NotesType[]> => {
  try {
    const res = await api.get(`/notes?${filter}=true&limit=${limit}&pages=${page}`);
    return res.data.notes || [];
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
    return [];
  }
};

export const getRecentNotes = async (): Promise<NotesType[]> => {
  try {
    const res = await api.get("/notes/recent");
    return res.data.recentNotes || [];
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
    return [];
  }
};

export const getNotesByFolder = async (folderId: string, page = 1): Promise<NotesType[]> => {
  try {
    const res = await api.get("/notes", {
      params: { folderId, limit: 10,page },
    });
    return res.data.notes || [];
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
    return [];
  }
};

export const getNoteById = async (id: string): Promise<NotesType | null> => {
  try {
    const res = await api.get(`/notes/${id}`);
    return res.data.note || null;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
    return null;
  }
};

export const getDeletedNotes = async (page = 1): Promise<NotesType[]> => {
  return getNotesByFilter("deleted", page);
};

export const getFavoriteNotes = async (page = 1) => {
  return getNotesByFilter("isFavorite", page);
};

export const getArchiveNotes = async (page = 1) => {
  return getNotesByFilter("isArchived", page);
};

export const searchNotes = async (title: string) => {
  try {
    const res = await api.get(`/notes?search=${title}&limit=10`);
    return res.data.notes || [];
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
    return [];
  }
};

export const createNote = async (
  folderId: string,
  title: string,
  content: string,
  date: Date,
) => {
  try {
    const res = await api.post("/notes", { folderId, title, content, date });
    return res.data;
  } catch (e) {
    if (e instanceof Error) return e.message;
    else toast.error("Internal Error");
  }
};

export const restoreNote = async (id: string) => {
  try {
    const res = await api.post(`/notes/${id}/restore`);
    return res.data;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
  }
};

const patchNote = async (id: string, data: NotePatch) => {
  try {
    const res = await api.patch(`/notes/${id}`, data);
    return res.data;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else toast.error("Internal Error");
  }
};

export const putNotes = async (
  noteId: string,
  title: string,
  content: string,
) => {
  return patchNote(noteId, { title, content });
};

export const favNote = async (id: string, value: boolean) => {
  return patchNote(id, { isFavorite: value });
};

export const archiveNote = async (id: string, value: boolean) => {
  return patchNote(id, { isArchived: value });
};

export const moveNote = async (noteId: string, folderId: string) => {
  return patchNote(noteId, { folderId });
};




export const searchbar = async (query: string) => {
  const res = await api.get(`/notes?q=${query}`);
  return res.data;
};

