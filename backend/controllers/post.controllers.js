export const setPosts = async (req, res) => {
    if (!req.body.message) {
        res.status(400).json({ message: "Merci d'ajouter un message" });
    }

    // const post = await

    res.status(200).json({ message: "ça fonctionne" });
};

export const getPosts = async (req, res) => {
    res.status(200).json({ message: "Get fonctionne" });
};
