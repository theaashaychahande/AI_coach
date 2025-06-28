import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LeftSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="sidebar" style={{ width: isOpen ? '200px' : '50px', transition: 'width 0.3s' }}>
            <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
            {isOpen && (
                <ul>
                    <li><Link to="/first">First</Link></li>
                    <li><Link to="/second">Second</Link></li>
                    <li><Link to="/third">Third</Link></li>
                </ul>
            )}
        </div>
    );
};

export default LeftSidebar;