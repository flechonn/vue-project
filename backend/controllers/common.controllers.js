import fs from 'fs';

export const LikedFilePath = new URL("../Likedtrack.json", import.meta.url).pathname;
export const DataFilePath = new URL("../data.json", import.meta.url).pathname;
export const PlaylistFilePath = new URL("../playlist.json", import.meta.url).pathname;



export const deleteData = async (filePath, idToDelete) => {
    try {
        let existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        // Recherche de l'index de l'élément avec l'ID à supprimer
        const indexToDelete = existingData.findIndex(item => item.id === idToDelete);
        
        if (indexToDelete !== -1) {
            // Suppression de l'élément correspondant à l'ID
            existingData.splice(indexToDelete, 1);
            // Réécriture des données mises à jour dans le fichier
            fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
            return true; // Indique que la suppression a réussi
        } else {
            return false; // Indique que l'élément n'a pas été trouvé
        }
    } catch (error) {
        console.error('Erreur lors de la suppression des données dans le fichier:', error);
        throw new Error("Erreur lors de la suppression des données dans le fichier");
    }
}

// common.controllers.js
export const postData = async (filePath, req, res, generateNewId) => {
    console.log("Corps de la requête:", req.body);

    try {
        const newData = req.body;
        let existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        if (generateNewId) {
            const lastId = existingData.length > 0 ? existingData[existingData.length - 1].id : 0;
            newData.id = lastId + 1;
        }
        
        let indexToInsert = existingData.findIndex(item => item.id > newData.id);
        
        if (indexToInsert === -1) {
            existingData.push(newData); // Si la nouvelle musique a le plus grand ID, l'ajouter à la fin
        } else {
            existingData.splice(indexToInsert, 0, newData); // Insérer avant l'élément avec un ID plus grand
        }

        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
        
        return res.status(201).json({ message: "Musique ajoutée avec succès" });
    } catch (error) {
        console.error('Erreur lors de l\'écriture des données dans le fichier:', error);
        return res.status(500).json({ message: "Erreur lors de l'écriture des données dans le fichier" });
    }
}
