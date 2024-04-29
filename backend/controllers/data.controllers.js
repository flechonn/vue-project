import fs from 'fs';

//'/'
export const setData = async (req, res) => {
    const dataFilePath = new URL("../data.json", import.meta.url).pathname;

    try {
        const newData = {
            "id": -1,
             //à récupérer depuis le post
            "titre": "Imagine",
            "auteur": "John Lennon",
            "duree": "3:02",
            "album": "Imagine"
        };

        // Lecture du fichier existant
        const existingData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
        
        const lastId = existingData.length > 0 ? existingData[existingData.length - 1].id : 0;
        newData.id = lastId + 1;

        existingData.push(newData);
        fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));
        
        return res.status(200).json({ message: "Musique ajoutée avec succès" });
    } catch (error) {
        console.error('Erreur lors de l\'écriture des données dans le fichier:', error);
        return res.status(500).json({ message: "Erreur lors de l'écriture des données dans le fichier" });
    }
}

//'/:id'

export const delData = async (req, res) => {
    const dataFilePath = new URL("../data.json", import.meta.url).pathname;

    try {
        const idToDelete = parseInt(req.params.id); // Convertir l'ID en entier
        // Lecture du fichier existant
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
    const data = JSON.parse(readFileSync(dataFilePath, "utf-8"));
    res.status(200).json(data);
};
