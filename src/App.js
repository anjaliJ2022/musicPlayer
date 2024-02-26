import React, { useState, useEffect } from "react";
import "./App.css"
function App() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    // Load playlist and playback status from localStorage on initial render
    const storedPlaylist = JSON.parse(localStorage.getItem("playlist")) || [];
    setPlaylist(storedPlaylist);

    const storedCurrentTrackIndex =
      JSON.parse(localStorage.getItem("currentTrackIndex")) || 0;
    setCurrentTrackIndex(storedCurrentTrackIndex);
  }, []);

  useEffect(() => {
    // Save playlist and playback status to localStorage whenever they change
    localStorage.setItem("playlist", JSON.stringify(playlist));
    localStorage.setItem(
      "currentTrackIndex",
      JSON.stringify(currentTrackIndex)
    );
  }, [playlist, currentTrackIndex]);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const newPlaylist = [...playlist];

    for (let i = 0; i < files.length; i++) {
      newPlaylist.push({
        file: files[i],
        name: files[i].name,
        url: URL.createObjectURL(files[i]),
      });
    }

    setPlaylist(newPlaylist);
  };

  const handlePlay = (index) => {
    setCurrentTrackIndex(index);
  };

  const handleEnded = () => {
    // Play the next track when the current one ends
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  return (
    <div className="music-wrapper h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-white">
        <h3 className="text-8xl font-bold my-2 text-center"> Music Player</h3>
        <div class="mb-3">
          <p className="text-xs my-1">Upload audio File to add to the playlist</p>
          <input
            class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            type="file"
            accept="audio/*"
            multiple
            onChange={handleFileUpload}
          />
        </div>
        <div className="my-3">
          <Playlist
            playlist={playlist}
            currentTrackIndex={currentTrackIndex}
            onPlay={handlePlay}
          />
        </div>
        <audio
        className="w-full"
          controls
          src={
            playlist[currentTrackIndex] ? playlist[currentTrackIndex].url : ""
          }
          onEnded={handleEnded}
          autoPlay
        />
      </div>
    </div>
  );
}

function Playlist({ playlist, currentTrackIndex, onPlay }) {
  return (
    <div>
      <h2 className="font-semibold tracking-wider ">My Playlist</h2>
      <ul>
        {playlist.map((track, index) => (
          <li key={index}
          className="border-2 my-1 rounded min-w-full "
          >
            <button
              
              onClick={() => onPlay(index)}
            >
              {index === currentTrackIndex ? "▶️" : "▶️"}
              {track.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
