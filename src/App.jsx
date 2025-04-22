import { useState } from 'react';
import './design/App.css';
import { getSongID, getSongRecommendations } from './api';
import Music from './assets/music.svg';
import Search from './assets/search.svg';
import RightArrow from './assets/right-chevron.svg';

function App() {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  }

  const handleRecommendations = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      if (query === '') {
        setLoading(false)
        return null;
      }
      setRecommendations([]);
      const id = await getSongID(query);
      const recs = await getSongRecommendations(id);
      await Promise.all(
        recs.map(song => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = song.recommended_song.header_image_url;
            img.onload = resolve;
            img.onerror = reject;
          });
        })
      );
      setRecommendations(recs);
    } catch (error) {
      console.error("fs fucked some shit up", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="main">
      <div className="header">
          <div className="titleGroup">
            <img src={Music} alt="Logo" width="36" height="36" />
            <p className="title"><b>Simple</b>Recs</p>
          </div>
          <p className="subtitle"><i>powered by Genius - Song Lyrics API</i></p>
          <p className="subtitle"><i>Raj Nallanthighal 2025</i></p>
      </div>
      <div className="body">
        <form onSubmit={handleRecommendations}>
          <p className="instruction">Enter a song, artist, or vibe.</p>
          <div className="inputBar">
            <img className="search" src={Search} alt="Search" width="36" height="36" />
            <input  type="text"
                    value={query}
                    onChange={handleQueryChange}
                    placeholder='e.g. The Marías, Young Thug, psychedelic, r&b...'/>
            <button type="submit">
              {loading ? (
                <div className="spinner" />
              ) : (
                <img className="submit" src={RightArrow} alt="Submit" width="40" height="36" />
              )}
            </button>
          </div>
        </form>
        {recommendations.map((song, index) => {
          return(
          <div key={index} className="song" style={{animationDelay: `${index * 250}ms`}}>
            <img src={song.recommended_song.header_image_url} className="picture" alt="Song Image" width="100" height="100" />
            <div className="details">
              <p className="song_title">{song.recommended_song.title}</p>
              <p className="song_artist">{song.recommended_song.primary_artist.name}</p>
            </div>
              <a className="link" href={song.recommended_song.url} target="_blank">
                <img src={Music}  alt="Link" width="20" height="20" />
              </a>
          </div>
          )})
        }
      </div>
    </div>
  );
}

export default App;
