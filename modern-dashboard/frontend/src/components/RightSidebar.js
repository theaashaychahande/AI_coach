import React, { useState } from 'react';

const RightSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="chat-sidebar" style={{ right: isOpen ? '0' : '-300px', transition: 'right 0.3s' }}>
            <button onClick={() => setIsOpen(!isOpen)}>Toggle Chat</button>
            {isOpen && <div>Chatbox Content</div>}
        </div>
    );
};

export default RightSidebar;