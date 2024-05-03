import fs from 'fs';
import { describe, test, expect } from 'vitest';
import { deleteData, LikedFilePath, DataFilePath, PlaylistFilePath } from './common.controllers'; // Assurez-vous de remplacer 'yourFilePath' par le chemin correct

// Fonction de test pour deleteData
describe('deleteData function', () => {
  // Test pour vérifier la suppression réussie d'un élément existant
  test('Should delete an existing item from the file', () => {
    // Créer des données fictives pour le test
    const fakeData = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ];
    // Écrire les données fictives dans un fichier de test
    fs.writeFileSync(LikedFilePath, JSON.stringify(fakeData));

    // Appeler la fonction de suppression pour supprimer l'élément avec l'ID 2
    deleteData(LikedFilePath, 2, false);

    // Lire à nouveau le fichier pour vérifier si l'élément a été supprimé
    const newData = JSON.parse(fs.readFileSync(LikedFilePath, 'utf-8'));

    // Vérifier que l'élément avec l'ID 2 a été supprimé
    expect(newData).not.toContainEqual({ id: 2, name: 'Item 2' });
  });

  // Test pour vérifier le comportement lorsque l'élément à supprimer n'existe pas
  test('Should return false when trying to delete non-existing item', () => {
    // Créer des données fictives pour le test
    const fakeData = [
      { id: 1, name: 'Item 1' },
      { id: 3, name: 'Item 3' }
    ];
    // Écrire les données fictives dans un fichier de test
    fs.writeFileSync(DataFilePath, JSON.stringify(fakeData));

    // Appeler la fonction de suppression pour supprimer l'élément avec l'ID 2
    const result = deleteData(DataFilePath, 2, false);

    // Vérifier que la fonction renvoie false car l'élément n'existe pas
    expect(result).toBe(false);
  });

  // Test pour vérifier le comportement lorsque le fichier n'existe pas
  test('Should throw an error when file does not exist', () => {
    // Appeler la fonction de suppression sur un fichier inexistant
    expect(() => deleteData('/path/to/nonexistent/file.json', 1, false)).toThrowError();
  });
});
