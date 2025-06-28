import React, { useRef } from 'react';

const VideoPlayer = () => {
    const videoRef = useRef(null);

    const handlePlay = () => {
        videoRef.current.play();
    };

    return (
        <div>
            <iframe
                ref={videoRef}
                width="640"
                height="360"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
            <button onClick={handlePlay}>Play Video</button>
        </div>
    );
};

export default VideoPlayer;