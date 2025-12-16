import React, { useEffect, useRef, useState } from 'react'
import "./App.css"

const App = () => {

  const songs = [
    {
      title: "Drunk Arjan",
      artist: "Arjan Dhillon",
      src: "Drunk_Arjan.mp3",
      image: "drink.png",
    },
    {
      title: "Koke",
      artist: "Arjan Dhillon",
      src: "koke.mp3",
      image: "koke.png",
    },
  ]

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.play();
    setIsPlaying(true);
  }, [index])

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if(audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      } 
    };

    const interval = setInterval(updateProgress, 500);

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    return () => {

      clearInterval(interval);
      audio.removeEventListener("ended", handleEnded);

    };

  }, [index])

  const togglePlayPause = () => {
    const audio = audioRef.current;

    if(isPlaying) {
      audio.pause();
    }
    else {
      audio.play();
    }
    setIsPlaying(!isPlaying)
  }

  const nextSong = () => {
    setIndex((prev) => (prev + 1) % songs.length);
  }

  const prevSong = () => {
    setIndex((prev) => (prev - 1 + songs.length) % songs.length);
  }

   const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercent = clickX / width;
    const audio = audioRef.current;
    audio.currentTime = clickPercent * audio.duration;
    setProgress(clickPercent * 100);
  };

  return (
    <div id='appp'>

    <div id='main-div'>

      <h1 id='heading1'>MUSIFY</h1>

      <img 
      id='im'
      src={songs[index].image} 
      alt={songs[index].title} 
      />
      <h2 className='name' id='heading'>{songs[index].title}</h2>
      <p className='name' id='para'>{songs[index].artist}</p>

      <audio ref={audioRef} src={songs[index].src}></audio>

      <br /><br /><br /><br />

      <div
        ref={progressRef}
        onClick={handleProgressClick}
        style={{
          width: "100%",
          height: "10px",
          backgroundColor: "#555",
          borderRadius: "5px",
          margin: "20px 0",
          cursor: "pointer",
          position: "relative",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#1db954",
            borderRadius: "5px",
            transition: "width 0.2s",
          }}
        ></div>
      </div>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <button className='icon-btn' onClick={prevSong}><svg width="28" height="28" viewBox="0 0 24 24" fill="white">
  <path d="M6 6h2v12H6zM18 6v12l-8-6z"/>
</svg>
</button>
        <button className='icon-btn' onClick={togglePlayPause}>{isPlaying ? <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
  <path d="M6 5h4v14H6zM14 5h4v14h-4z"/>
</svg>
 : <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
  <path d="M8 5v14l11-7z"/>
</svg>
}</button>
        <button className='icon-btn' onClick={nextSong}><svg width="28" height="28" viewBox="0 0 24 24" fill="white">
  <path d="M16 6h2v12h-2zM6 6v12l8-6z"/>
</svg>
</button>
      </div>
    
    </div> 
      
    </div>
  )
}

export default App