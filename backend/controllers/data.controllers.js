import fs from 'fs';
import { deleteData,postData,DataFilePath,LikedFilePath } from './common.controllers.js';


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
    await postData(DataFilePath, req, res, true);
}

export const getData = async (req, res) => {
    const data = JSON.parse(fs.readFileSync(DataFilePath, "utf-8"));
    res.status(200).json(data);
};

export const patchData = async (req, res) => {
    console.log("Corps de la requête:", req.body);
    try {
        const data = JSON.parse(fs.readFileSync(DataFilePath, "utf-8"));
        console.log("prams de la requête:", req.params);
        const index = data.findIndex(item => item.id === parseInt(req.params.id));
        // Vérification si l'élément existe
        if (index === -1) {
            return res.status(404).json({ message: "L'élément n'a pas été trouvé." });
        }
        data[index] = { ...data[index], ...req.body };

        // Écriture des données mises à jour dans le fichier JSON
        fs.writeFileSync(DataFilePath, JSON.stringify(data, null, 2));
        res.status(200).json({ message: "Données mises à jour avec succès.", updatedData: data[index] });
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour des données." });
    }
};

