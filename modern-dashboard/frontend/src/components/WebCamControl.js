import React, { useState } from 'react';

const WebcamControl = () => {
    const [isOn, setIsOn] = useState(false);

    const toggleWebcam = async () => {
        setIsOn(!isOn);
        // Send request to backend to start/stop webcam
        await fetch('/api/webcam', { method: 'POST', body: JSON.stringify({ isOn }) });
    };

    return (
        <button onClick={toggleWebcam}>
            {isOn ? 'Turn Off Webcam' : 'Turn On Webcam'}
        </button>
    );
};

export default WebcamControl;