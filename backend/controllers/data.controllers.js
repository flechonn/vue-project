import fs from 'fs';
import { deleteData, postData, patchData, DataFilePath, LikedFilePath,PlaylistFilePath } from './common.controllers.js';

function removeTrackFromPlaylists(trackId) {
    try {
        const playlists = JSON.parse(fs.readFileSync(PlaylistFilePath, "utf-8"));
        
        playlists.forEach(playlist => {
            const index = playlist.tracks.findIndex(track => track.id === trackId);            
            if (index !== -1) {
                playlist.tracks.splice(index, 1);
            }
        });
        fs.writeFileSync(PlaylistFilePath, JSON.stringify(playlists, null, 2));

        console.log("Musique retirée de toutes les playlists avec succès.");
    } catch (error) {
        console.error("Erreur lors de la suppression de la musique des playlists:", error);
    }
}

export const delData = async (req, res) => {
    try {
        const idToDelete = parseInt(req.params.id);
        const successData = deleteData(DataFilePath, idToDelete,false);
        if (successData) {
            //si la musique est présente on essaye de la supprime des titres likées
            deleteData(LikedFilePath, idToDelete,false);
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
    postData(DataFilePath, req, res, true,false);
}

export const getData = async (req, res) => {
    const data = JSON.parse(fs.readFileSync(DataFilePath, "utf-8"));
    res.status(200).json(data);
};

export const editData = async (req, res) => {
    patchData(DataFilePath, req, res);
};


