import fs from 'fs';

export const getLiked = async (req, res) => {
    const dataFilePath = new URL("../Likedtrack.json", import.meta.url).pathname;
    const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
    res.status(200).json(data);
};