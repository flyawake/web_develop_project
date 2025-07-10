// App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalHeader from './components/GlobalHeader';
import AppRouter from './router';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <GlobalHeader />
                <AppRouter />
            </div>
        </Router>
    );
}

export default App;