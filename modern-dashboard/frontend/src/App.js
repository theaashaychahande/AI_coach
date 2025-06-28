import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LeftSidebar from '/components/LeftSidebar';

const FirstPage = () => <h1>First Page</h1>;
const SecondPage = () => <h1>Second Page</h1>;
const ThirdPage = () => <h1>Third Page</h1>;

function App() {
    return (
        <Router>
            <LeftSidebar />
            <Routes>
                <Route path="/first" element={<FirstPage />} />
                <Route path="/second" element={<SecondPage />} />
                <Route path="/third" element={<ThirdPage />} />
            </Routes>
        </Router>
    );
}

export default App;