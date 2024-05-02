import fs from 'fs';

export const LikedFilePath = new URL("../Likedtrack.json", import.meta.url).pathname;
export const DataFilePath = new URL("../data.json", import.meta.url).pathname;
export const PlaylistFilePath = new URL("../playlist.json", import.meta.url).pathname;



export const deleteData = (filePath, idToDelete) => {
    try {
        let existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const indexToDelete = existingData.findIndex(item => item.id === idToDelete);
        
        if (indexToDelete !== -1) {
            // Suppression de l'élément correspondant à l'ID
            existingData.splice(indexToDelete, 1);
            fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
            return true; 
        } else {
            return false; 
        }
    } catch (error) {
        console.error('Erreur lors de la suppression des données dans le fichier:', error);
        throw new Error("Erreur lors de la suppression des données dans le fichier");
    }
}

export const postData = (filePath, req, res, NewIdMusique,NewIdPlaylist) => {
    console.log("Corps de la requête:", req.body);

    try {
        const newData = req.body;
        let existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        if (NewIdMusique) {
            const lastId = existingData.length > 0 ? existingData[existingData.length - 1].id : 0;
            newData.id = lastId + 1;
        }

        if (NewIdPlaylist) {
            const lastidp = existingData.length > 0 ? existingData[existingData.length - 1].idp : 0;
            newData.idp = lastidp + 1;
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

export const patchData = (filePath, req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        console.log("Params de la requête:", req.params);
        const index = data.findIndex(item => item.id === parseInt(req.params.id));
        // Vérification si l'élément existe
        if (index === -1) {
            return res.status(404).json({ message: "L'élément n'a pas été trouvé." });
        }
        data[index] = { ...data[index], ...req.body };

        // Écriture des données mises à jour dans le fichier JSON
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        res.status(200).json({ message: "Données mises à jour avec succès.", updatedData: data[index] });
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour des données." });
    }
};
