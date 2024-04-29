export const setPosts = async (req, res) => {
    console.log(req.body)
    
    if (!req.body.message) {
        res.status(400).json({ message: "Merci d'ajouter un message" });
    }
    const message = req.body.message;

    // Faites quelque chose avec le message, comme le sauvegarder dans une base de données

    // Répondre au client avec un message de succès
    return res.status(200).json({ message: "Message posté avec succès", postedMessage: message });
};

export const getPosts = async (req, res) => {
    res.status(200).json({ message: "Get fonctionne" });
};
