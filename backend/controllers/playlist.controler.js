import fs from 'fs';
import { patchData,postData,deleteData,PlaylistFilePath } from './common.controllers.js';

export const delPlaylist = async (req, res) => {
    try {
        const idToDelete = parseInt(req.params.id);
        const success = await deleteData(PlaylistFilePath, idToDelete);
        if (success) {
            return res.status(200).json({ message: `Playlist supprimée avec succès: ${idToDelete}` });
        } else {
            return res.status(404).json({ message: "Aucune Playlist trouvée avec cet ID" });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression des données dans le fichier:', error);
        return res.status(500).json({ message: "Erreur lors de la suppression des données dans le fichier" });
    }
}

export const getPlaylist = async (req, res) => {
    const data = JSON.parse(fs.readFileSync(PlaylistFilePath, "utf-8"));
    res.status(200).json(data);
};

export const addPlaylist = async (req, res) => {
    await postData(PlaylistFilePath, req, res, false);
}

export const editPlaylist = async (req, res) => {
    await patchData(PlaylistFilePath,req,res);
};

