export type  NotesType   =   {
      "id": string,
      "folderId": string,
      "title": string,
      "isFavorite": boolean,
      "isArchived": boolean,
      "createdAt": string,
      "updatedAt": string,
      "deletedAt": null,
      "preview": string,
      "folder": {
        "id": string,
        "name": string,
        "createdAt": string,
        "updatedAt": string,
        "deletedAt": null
      }
}


export type Folder = {
  id: string;
  name: string;
  createdAt: string;
};