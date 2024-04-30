
export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json(); // Parser le texte en JSON
    } else {
      throw new Error('Erreur lors de la récupération des données: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Erreur lors de la récupération des données: ' + error.message);
  }
}
