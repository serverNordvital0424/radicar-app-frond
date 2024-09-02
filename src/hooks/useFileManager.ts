import { useState, useEffect } from "react";
import { createFolder, deleteItem, downloadFile, getFolderContent, uploadFile } from "../utils/api-config";

interface FileItem { // Renombrado de File a FileItem
    id: string;
    name: string;
    size: number;
    mimeType: string;
    createdAt: string;
    updatedAt: string;
}

interface Folder {
    id: string;
    name: string;
    path: string;
    parentId: string | null;
    createdAt: string;
    updatedAt: string;
}

interface FolderContents {
    files: FileItem[]; // Actualizado a FileItem
    folders: Folder[];
}

export const useFileManager = (initialFolderId?: string) => {
    const [currentFolderId, setCurrentFolderId] = useState<string | null>(initialFolderId || null);
    console.log(currentFolderId)
    const [contents, setContents] = useState<FolderContents | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch folder contents
    const fetchContents = async () => {
        setLoading(true);
        try {

            const response = await getFolderContent(currentFolderId || undefined);
            console.log("data",response.data)
            
            setContents(response.data);
            setError(null);
        } catch (err) {
            setError("Error fetching folder contents");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContents();
    }, [currentFolderId]);
    console.log( "current folder id" ,currentFolderId)

    // Function to create a new folder
    const createNewFolder = async (name: string) => {
        if (!currentFolderId) return;
        try {
            await createFolder(currentFolderId, name);
            await fetchContents(); // Reload contents after creating a folder
        } catch (err) {
            setError("Error creating folder");
        }
    };

    // Function to upload a new file
    const uploadNewFile = async (file: File) => { // Usa el tipo global File ahora
        if (!currentFolderId) return;
        try {
            await uploadFile(currentFolderId, file);
            await fetchContents(); // Reload contents after uploading a file
        } catch (err) {
            setError("Error uploading file");
        }
    };

    // Function to delete an item (folder or file)
    const deleteItemById = async (id: string, type: "carpetas" | "archivo") => {
        try {
            await deleteItem(id, type);
            await fetchContents(); // Reload contents after deleting an item
        } catch (err) {
            setError(`Error deleting ${type === "carpetas" ? "folder" : "file"}`);
        }
    };

    // Function to download a file
    const downloadFileById = async (fileId: string, fileName: string) => { // Agregado fileName para el nombre real
        try {
            const response = await downloadFile(fileId);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            // Set the download attribute with the real file name
            link.setAttribute('download', fileName || `file_${fileId}`); // Usa el nombre real del archivo si está disponible
            document.body.appendChild(link);
            link.click();

            // Limpia el objeto URL creado
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError("Error downloading file");
        }
    };

    return {
        contents,
        loading,
        error,
        createNewFolder,
        uploadNewFile,
        deleteItemById,
        downloadFileById,
        setCurrentFolderId
    };
};