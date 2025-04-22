
/* returns only the songID 
   returns null if no songID found
*/
export async function getSongID(query) {
    const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${query}&per_page=1&page=1`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': `${process.env.REACT_APP_API_KEY}`,
            'x-rapidapi-host': `${process.env.REACT_APP_API_HOST}`
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.hits.length === 0) {
            return null
        } 
        return result.hits[0].result.id
    } catch (error) {
        console.error('you fucked some shit up:', error);
    }
}

/* returns some n number of song recommendations 
   returns null if no recommendations found
*/
export async function getSongRecommendations(songID) {
    const url = `https://genius-song-lyrics1.p.rapidapi.com/song/recommendations/?id=${songID}`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': `${process.env.REACT_APP_API_KEY}`,
            'x-rapidapi-host': `${process.env.REACT_APP_API_HOST}`
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.song_recommendations.length === 0) {
            return null
        } 
        return result.song_recommendations.recommendations
    } catch (error) {
        console.error('you fucked some shit up:', error);
    }
}