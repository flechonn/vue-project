import fs from 'fs';
import { patchData,postData,deleteData,PlaylistFilePath } from './common.controllers.js';

export const delPlaylist = async (req, res) => {
    try {
        const idToDelete = parseInt(req.params.id);
        console.log(idToDelete)
        const success = deleteData(PlaylistFilePath, idToDelete,true);
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
    postData(PlaylistFilePath, req, res, false,true);
}

export const editPlaylist = async (req, res) => {
    patchData(PlaylistFilePath,req,res,true);
};

// Ajoute une nouvelle route pour ajouter une musique à une playlist
export const addTrackToPlaylist = async (req, res) => {
    try {
        const playlistId = parseInt(req.params.playlistId);
        console.log("playlist id :"+playlistId)
        const trackToAdd = req.body; // Assure-toi que le frontend envoie les informations de la musique à ajouter dans le corps de la requête
        console.log("musique a ajouter")
        console.log(trackToAdd)
        // Récupère la playlist correspondante
        const playlists = JSON.parse(fs.readFileSync(PlaylistFilePath, "utf-8"));
        const playlistIndex = playlists.findIndex(p => p.idp === playlistId);        

        if (playlistIndex === -1) {
            return res.status(404).json({ message: "Playlist introuvable" });
        }

        // Ajoute la nouvelle musique à la liste des pistes de la playlist
        playlists[playlistIndex].tracks.push(trackToAdd);

        // Enregistre les modifications dans le fichier
        fs.writeFileSync(PlaylistFilePath, JSON.stringify(playlists, null, 2));

        return res.status(200).json({ message: "Musique ajoutée à la playlist avec succès" });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la musique à la playlist:', error);
        return res.status(500).json({ message: "Erreur lors de l'ajout de la musique à la playlist" });
    }
}
