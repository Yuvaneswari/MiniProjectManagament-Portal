import React, { useState } from 'react';
import { createTask } from '../services/api';

const AddTask = ({ navigate, darkMode }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPopper, setShowPopper] = useState(false);

    const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
        _id: Date.now().toString(), // important
        title,
        description,
        status: 'Pending'
    };

    // ✅ Save to localStorage
    const existing = JSON.parse(localStorage.getItem('demo_tasks')) || [];
    const updated = [newTask, ...existing];

    localStorage.setItem('demo_tasks', JSON.stringify(updated));

    console.log("Saved to localStorage:", updated);

    navigate('dashboard'); // go back
};
    // Controls showing the message window and automatically routes back to dashboard
    const triggerPopperPipeline = () => {
        setShowPopper(true);
        setTimeout(() => {
            setShowPopper(false);
            navigate('dashboard'); // Auto-routes user back to visual control grid
        }, 2200); // Popup stays on screen for exactly 2.2 seconds
    };

    const inputStyle = {
        width: '100%',
        boxSizing: 'border-box',
        padding: '14px 16px',
        borderRadius: '8px',
        border: `1px solid ${darkMode ? '#475569' : '#cbd5e1'}`,
        backgroundColor: darkMode ? '#0f172a' : '#ffffff',
        color: darkMode ? '#ffffff' : '#0f172a',
        fontSize: '0.95rem',
        outline: 'none',
        fontFamily: 'inherit'
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0', position: 'relative' }}>
            
            {/* 🌟 HIGH-END POP-UP POPPER MESSAGE COMPONENT */}
            {showPopper && (
                <div style={{
                    position: 'fixed',
                    top: '24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#10b981', // Premium Emerald Green Success Alert Background
                    color: '#ffffff',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    zIndex: 999,
                    animation: 'slideDown 0.3s ease-out',
                    fontWeight: '600',
                    fontSize: '1rem',
                    border: '1px solid #34d399'
                }}>
                    
                </div>
            )}

            <div style={{
                width: '100%', maxWidth: '650px',
                backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                padding: '40px', borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                border: `1px solid ${darkMode ? '#334155' : '#f1f5f9'}`
            }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.6rem', fontWeight: '700' }}>
                    Task Unit Initialization Engine
                </h3>
                <p style={{ margin: '0 0 28px 0', fontSize: '0.9rem', color: '#94a3b8' }}>
                    Commit modular project deliverables and track execution velocities across the distributed MERN architecture.
                </p>

                {error && <div style={{ padding: '14px', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '20px', border: '1px solid #fee2e2' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>Task Title *</label>
                        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter your Project Title" style={inputStyle} />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>Description * (Minimum 20 characters)</label>
                        <textarea required rows="4" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description related to your title" style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>Initial Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                            <option value="Pending">⏳ Pending</option>
                            <option value="In Progress">⚡ In Progress</option>
                            <option value="Completed">✅ Completed</option>
                        </select>

                      

                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                        <button type="button" onClick={() => navigate('dashboard')} style={{ backgroundColor: darkMode ? '#334155' : '#e2e8f0', color: darkMode ? '#fff' : '#000', border: 'none', padding: '14px 28px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                        
                                     {/* 🌟 Your Styled Submit Button */}
<button 
    type="submit" 
    disabled={loading}
    style={{ 
        backgroundColor: '#6366f1', 
        color: '#fff', 
        border: 'none', 
        padding: '14px 28px', 
        borderRadius: '8px', 
        cursor: loading ? 'not-allowed' : 'pointer', 
        fontWeight: '600', 
        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
        opacity: loading ? 0.7 : 1
    }}
>
    {loading ? 'Processing...' : 'Save Task'}
</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;

