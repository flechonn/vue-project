import fs from 'fs';
import { deleteData,LikedFilePath,postData } from './common.controllers.js';

export const delLiked = async (req, res) => {
    try {
        const idToDelete = parseInt(req.params.id);
        const success = deleteData(LikedFilePath, idToDelete);
        if (success) {
            return res.status(200).json({ message: `Musique supprimée avec succès: ${idToDelete}` });
        } else {
            return res.status(404).json({ message: "Aucune musique trouvée avec cet ID" });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression des données dans le fichier:', error);
        return res.status(500).json({ message: "Erreur lors de la suppression des données dans le fichier" });
    }
}

export const getLiked = async (req, res) => {
    const data = JSON.parse(fs.readFileSync(LikedFilePath, "utf-8"));
    res.status(200).json(data);
};

export const addLiked = async (req, res) => {
    postData(LikedFilePath, req, res, false,false);
}



