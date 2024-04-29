export async function loaddata() {
    try {
      const response = await fetch('http://localhost:4000/api/data')
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Erreur lors de la récupération des données: ' + response.statusText);
      }
    } catch (error) {
      throw new Error('Erreur lors de la récupération des données: ' + error);
    }
  }
  