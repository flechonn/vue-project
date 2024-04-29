import fs from 'fs';

//'/'
export const setData = async (req, res) => {
    const dataFilePath = new URL("../data.json", import.meta.url).pathname;
    console.log("Corps de la requête:", req.body);

    try {
        const { titre, auteur, duree, album } = req.body;
        const newData = {
            "id": -1,
            "titre": titre,
            "auteur": auteur,
            "duree": duree,
            "album": album
        };

        const existingData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
        
        const lastId = existingData.length > 0 ? existingData[existingData.length - 1].id : 0;
        newData.id = lastId + 1;

        existingData.push(newData);
        fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));
        
        return res.status(201).json({ message: "Musique ajoutée avec succès"  });
    } catch (error) {
        console.error('Erreur lors de l\'écriture des données dans le fichier:', error);
        return res.status(500).json({ message: "Erreur lors de l'écriture des données dans le fichier" });
    }
}

//'/:id'

export const delData = async (req, res) => {
    const dataFilePath = new URL("../data.json", import.meta.url).pathname;

    try {
        const idToDelete = parseInt(req.params.id);
        let existingData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
        // Recherche de l'index de l'élément avec l'ID à supprimer
        const indexToDelete = existingData.findIndex(item => item.id === idToDelete);
        
        if (indexToDelete !== -1) {
            // Suppression de l'élément correspondant à l'ID
            existingData.splice(indexToDelete, 1);
            // Réécriture des données mises à jour dans le fichier
            fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));
            
            return res.status(200).json({ message: `Musique supprimée avec succès: ${idToDelete}` });
        } else {
            return res.status(404).json({ message: "Aucune musique trouvée avec cet ID" });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression des données dans le fichier:', error);
        return res.status(500).json({ message: "Erreur lors de la suppression des données dans le fichier" });
    }
}



export const getData = async (req, res) => {
    const dataFilePath = new URL("../data.json", import.meta.url).pathname;
    const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
    res.status(200).json(data);
};

export const patchData = async (req, res) => {
    console.log("Corps de la requête:", req.body);

    try {
        const dataFilePath = new URL("../data.json", import.meta.url).pathname;
        const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
        console.log("prams de la requête:", req.params);
        const index = data.findIndex(item => item.id === parseInt(req.params.id));
        // Vérification si l'élément existe
        if (index === -1) {
            return res.status(404).json({ message: "L'élément n'a pas été trouvé." });
        }
        data[index] = { ...data[index], ...req.body };

        // Écriture des données mises à jour dans le fichier JSON
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        res.status(200).json({ message: "Données mises à jour avec succès.", updatedData: data[index] });
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour des données." });
    }
};

