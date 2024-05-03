import fs from 'fs';
import { describe, test, expect } from 'vitest';
import { deleteData, postData, patchData } from './common.controllers.js'; // Assurez-vous de remplacer 'yourFilePath' par le chemin correct

const DataFilePath = "./data.test.json";
const LikedFilePath = "./Likedtrack.test.json";
const PlaylistFilePath = "./playlist.test.json";

describe('deleteData function', () => {
    test('Should delete an existing item from the file', () => {
        // Créer des données fictives pour le test et les écrits
        const fakeData = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' }
        ];
        fs.writeFileSync(LikedFilePath, JSON.stringify(fakeData));

        deleteData(LikedFilePath, 2, false);

        const newData = JSON.parse(fs.readFileSync(LikedFilePath, 'utf-8'));
        expect(newData).not.toContainEqual({ id: 2, name: 'Item 2' });
    });

    test('Should return false when trying to delete non-existing item', () => {
        // Créer des données fictives pour le test et les écrits
        const fakeData = [
            { id: 1, name: 'Item 1' },
            { id: 3, name: 'Item 3' }
        ];
        fs.writeFileSync(DataFilePath, JSON.stringify(fakeData));

        // Appeler la fonction de suppression pour supprimer l'élément avec l'ID 2
        const result = deleteData(DataFilePath, 2, false);
        expect(result).toBe(false);
    });

    // Test pour vérifier le comportement lorsque le fichier n'existe pas
    test('Should throw an error when file does not exist', () => {
        expect(() => deleteData('/path/to/nonexistent/file.json', 1, false)).toThrowError();
    });
});

describe('postData function', () => {
    test('Should add a new music successfully', () => {
        // Données fictives pour la requête
        const req = { body: { title: 'New Music', artist: 'Artist' } };
        const res = {
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                return data;
            }
        };
        const filePath = DataFilePath; // Remplacez par le chemin correct

        const result = postData(filePath, req, res, true, false);

        const newData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        expect(result).toEqual({ message: "Musique ajoutée avec succès" });
        expect(newData.some(item => item.title === 'New Music' && item.artist === 'Artist')).toBe(true);
    });

    test('Should return an error message when failed to write data to file', () => {
        // Données fictives pour la requête
        const req = { body: { title: 'New Music', artist: 'Artist' } };
        const res = {
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                return data;
            }
        };
        const filePath = '/path/to/nonexistent/file.json'; // Fichier inexistant

        const result = postData(filePath, req, res, true, false);
        expect(result).toEqual({ message: "Erreur lors de l'écriture des données dans le fichier" });
    });
});

describe('patchData function', () => {
    test('Should update data successfully', () => {
        // Données fictives pour la requête
        const req = {
            params: { id: 1 }, 
            body: { title: 'Updated Title' } 
        };
        const res = {
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                return data;
            }
        };
        const filePath = DataFilePath;
        const result = patchData(filePath, req, res, false); // Supposant que ce n'est pas une playlist

        const updatedData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        expect(res.statusCode).toBe(200);
        expect(updatedData.find(item => item.id === 1).title).toBe('Updated Title');
    });

    test('Should return a 404 error when trying to update non-existing data', () => {
        // Données fictives pour la requête
        const req = {
            params: { id: 999 },
            body: { title: 'Updated Title' }
        };
        const res = {
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                return data;
            }
        };
        const filePath = DataFilePath; 
        const result = patchData(filePath, req, res, false); 

        // Vérification que la réponse renvoyée est une erreur 404
        expect(res.statusCode).toBe(404);
        expect(result).toEqual({ message: "L'élément n'a pas été trouvé." });
    });

    test('Should return a 500 error when failed to update data', () => {
        // Données fictives pour la requête
        const req = {
            params: { id: 1 },
            body: { title: 'Updated Title' }
        };
        const res = {
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                return data;
            }
        };
        const filePath = '/path/to/nonexistent/file.json'; 
        const result = patchData(filePath, req, res, false);
        expect(res.statusCode).toBe(500);
    });
});