import React from "react";
import folderIcon from "../../../../public/assets/folder-sgc.svg";
import ItemManu from "./ItemManu";
import { Bounce, toast } from "react-toastify";

interface Folder {
  id: string;
  name: string;
}

interface FolderListProps {
  folders: Folder[];
  onFolderClick: (folderId: string, folderName: string) => void;
  onDelete: (id: string, type: "carpetas" | "archivo") => void;
  renameItem: (
    id: string,
    newName: string,
    type: "carpetas" | "archivo"
  ) => void;
}

const FolderList: React.FC<FolderListProps> = ({
  folders,
  onFolderClick,
  onDelete,
  renameItem,
}) => {
  const handleDelete = (folderId: string) => {
    //Llama ka funcion de eliminacion
    onDelete(folderId, "carpetas");
    //Muestra la notificacion  despues de eliminar la carpeta
    toast.success("Carpeta eliminada con éxito!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const handleRename = (folderId: string, newName: string) => {
    //Llama la funcion de renombrado
    renameItem(folderId, newName, "carpetas");

    //Muestra la notificacion despues de renombrar la carpeta
    toast.success("Carpeta renombrada con éxito!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
      {folders.map((folder) => (
        <div
          key={folder.id}
          onClick={() => onFolderClick(folder.id, folder.name)} // Se abre la carpeta
          className="relative flex flex-col items-center p-4 text-gray-700 bg-gray-200 rounded-md cursor-pointer dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-indigo-500 dark:hover:underline"
        >
          {/* Icono de la carpeta */}
          <img src={folderIcon} alt="folder-icon" className="w-16 h-16 mb-2" />
          {/* Menú en la esquina superior derecha */}
          <div
            className="absolute top-2 right-2"
            onClick={(e) => e.stopPropagation()} // Evitar que el clic aquí abra la carpeta
          >
            <ItemManu
              onDelete={() => handleDelete(folder.id)}
              renameItem={(newName: string) => handleRename(folder.id, newName)}
            />
          </div>

          {/* Nombre de la carpeta */}
          <p className="text-sm font-bold text-center text-gray-700 dark:text-stone-200 ">{folder.name}</p>
        </div>
      ))}
    </div>
  );
};

export default FolderList;
