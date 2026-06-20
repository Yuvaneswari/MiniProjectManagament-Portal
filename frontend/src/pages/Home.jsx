import React from 'react';
const Home = ({ navigate }) => {
    return (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '20px', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                Manage Your Agile Production Pipelines
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: '650px', margin: '0 auto 40px auto', lineHeight: '1.7' }}>
                Welcome to the Project Management Portal—where complex development workflows transform into organized, high-velocity production pipelines.
            </p>
            <button 
                onClick={() => navigate('auth')} 
                style={{ backgroundColor: '#6366f1', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)' }}
            >
                Get Started
            </button>
        </div>
    );
};

export default Home;