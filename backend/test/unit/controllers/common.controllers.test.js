import { deleteData } from '../../../controllers/common.controllers.js';
import supertest from 'supertest'

describe('deleteData', () => {
  it('should delete data successfully', async () => {
    // Supposons que vous avez un fichier testData.json existant avec des données
    const result = await deleteData('./testData.json', '2');
    // Vérifiez simplement si la fonction renvoie true
    expect(result).toBe(true);
  });

  it('should return false if data with specified ID does not exist', async () => {
    // Supposons que vous avez un fichier testData.json existant avec des données
    // Mais l'ID '2' n'existe pas
    const result = await deleteData('./testData.json', '2');
    // Vérifiez simplement si la fonction renvoie false
    expect(result).toBe(false);
  });
});
