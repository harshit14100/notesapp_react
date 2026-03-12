import api from "./API";
import type { Folder } from "../types/types";
import toast from "react-hot-toast";

export const deleteFolder = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/folders/${id}`);
    toast.success("Folder deleted");
    return true;
  } catch (e) {
    toast.error("Failed to delete folder"+ e);
    return false;
  }
};



export const getFolders = async (): Promise<Folder[]> => {
  try {
    const res = await api.get("/folders");
    return res.data.folders || [];
  } catch (e) {
    toast.error("Failed to fetch folders"+ e);
    return [];
  }
};

export const createFolder = async (name: string) => {
  try {
    const res = await api.post("/folders", { name });
    toast.success("Folder created");
    return res.data;
  } catch (e) {
    toast.error("Failed to create folder"+ e);
    return null;
  }
};

export const updateFolder = async (folderId: string, folderName: string) => {
  try {
    const res = await api.patch(`/folders/${folderId}`, { name: folderName });
    toast.success("Folder updated");
    return res.data;
  } catch (e) {
    toast.error("Failed to update folder"+ e);
    return null;
  }
};