import fs from 'fs';
import { deleteData, postData, patchData, DataFilePath, LikedFilePath } from './common.controllers.js';


export const delData = async (req, res) => {
    try {
        const idToDelete = parseInt(req.params.id);
        const successData = await deleteData(DataFilePath, idToDelete);
        if (successData) {
            //si la musique est présente on essaye de la supprime des titres likées
            await deleteData(LikedFilePath, idToDelete);
            return res.status(200).json({ message: `Musique supprimée avec succès: ${idToDelete}` });
        } else {
            return res.status(404).json({ message: "Aucune musique trouvée avec cet ID" });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression des données dans le fichier:', error);
        return res.status(500).json({ message: "Erreur lors de la suppression des données dans le fichier" });
    }
}

export const setData = async (req, res) => {
    await postData(DataFilePath, req, res, true,false);
}

export const getData = async (req, res) => {
    const data = JSON.parse(fs.readFileSync(DataFilePath, "utf-8"));
    res.status(200).json(data);
};

export const editData = async (req, res) => {
    await patchData(DataFilePath, req, res);
};


