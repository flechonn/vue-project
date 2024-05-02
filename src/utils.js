
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

export async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('La requête n\'a pas abouti : ' + response.status);
    }
  } catch (error) {
    throw new Error('Erreur lors de l\'envoi de la requête:', error);
  }
}

export async function deleteData(url) {
  try {
    const response = await fetch(url, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('La requête n\'a pas abouti : ' + response.status);
    }
  } catch (error) {
    throw new Error('Erreur lors de la suppression de la musique:', error);
  }
}

export async function patchData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('La requête n\'a pas abouti : ' + response.status);
    }
    console.log("Requête réussie!");
    console.log("Modifications enregistrées :", data);
  } catch (error) {
    throw new Error('Erreur lors de l\'envoi de la requête:', error);
  }
}

