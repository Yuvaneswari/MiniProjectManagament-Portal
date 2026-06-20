import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';

function App() {
    const [page, setPage] = useState('home'); 
    const [user, setUser] = useState(null); 
    const [darkMode, setDarkMode] = useState(true);

    const handleAuthSuccess = (userData) => {
        setUser(userData);
        setPage('dashboard');
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        setPage('home');
    };

    // Global Wrapper Styles
    const wrapperStyle = {
        minHeight: '100vh',
        boxSizing: 'border-box',
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        backgroundColor: darkMode ? '#0b0f19' : '#f8fafc',
        color: darkMode ? '#f8fafc' : '#0f172a',
        transition: 'all 0.3s',
        position: 'relative',
        overflow: 'hidden'
    };

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 40px',
        backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${darkMode ? '#1e293b' : '#e2e8f0'}`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
    };

    const navLinkStyle = (active) => ({
        background: 'none',
        border: 'none',
        color: active ? '#6366f1' : (darkMode ? '#94a3b8' : '#64748b'),
        fontWeight: '600',
        fontSize: '0.95rem',
        cursor: 'pointer',
        padding: '6px 12px',
        borderRadius: '6px',
        backgroundColor: active ? (darkMode ? '#1e1b4b' : '#e0e7ff') : 'transparent',
        transition: 'all 0.2s'
    });

    return (
        <div style={wrapperStyle}>
            {/* Architectural Grid Tech Background */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1,
                opacity: darkMode ? 0.07 : 0.03,
                backgroundImage: 'linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)',
                backgroundSize: '40px 40px', pointerEvents: 'none'
            }}></div>

            {/* Header Navigation Options */}
            <nav style={navStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <h1 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '700', color: '#6366f1', cursor: 'pointer' }} onClick={() => setPage('home')}>
                        Project Management Portal
                    </h1>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => setPage('home')} style={navLinkStyle(page === 'home')}>Home</button>
                        <button onClick={() => setPage('auth')} style={navLinkStyle(page === 'auth')}>Register / Login</button>
                        <button onClick={() => setPage('dashboard')} style={navLinkStyle(page === 'dashboard')}>Dashboard</button>
                        <button onClick={() => setPage('add')} style={navLinkStyle(page === 'add')}>Add Task</button>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', zIndex: 5 }}>
                    <button onClick={() => setDarkMode(!darkMode)} style={{ padding: '8px 14px', borderRadius: '8px', border: `1px solid ${darkMode ? '#334155' : '#cbd5e1'}`, cursor: 'pointer', backgroundColor: darkMode ? '#1e293b' : '#fff', color: darkMode ? '#fff' : '#000', fontWeight: '500' }}>
                        {darkMode ? '☀️ Light' : '🌙 Dark'}
                    </button>
                    {user && (
                        <button onClick={handleLogout} style={{ padding: '8px 14px', borderRadius: '8px', backgroundColor: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
                            Logout
                        </button>
                    )}
                </div>
            </nav>

            {/* Dynamic Core View Rendering Frame */}
            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px', position: 'relative', zIndex: 2 }}>
                {page === 'home' && <Home navigate={setPage} />}
                {page === 'auth' && <Login onAuthSuccess={handleAuthSuccess} darkMode={darkMode} />}
                {page === 'dashboard' && <Dashboard navigate={setPage} darkMode={darkMode} />}
                {page === 'add' && <AddTask navigate={setPage} darkMode={darkMode} />}
            </main>
        </div>
    );
}

export default App;