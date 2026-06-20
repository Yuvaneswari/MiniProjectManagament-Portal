import React from 'react';

const TaskCard = ({ task, onComplete, onDelete, darkMode }) => {
    const cardStyle = {
        background: darkMode ? '#1e293b' : '#ffffff',
        color: darkMode ? '#f8fafc' : '#0f172a',
        padding: '24px',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        border: `1px solid ${darkMode ? '#334155' : '#f1f5f9'}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.2s ease',
    };

    const getStatusStyle = (status) => {
        if (status === 'Completed') return { bg: '#dcfce7', text: '#15803d' };
        if (status === 'In Progress') return { bg: '#dbeafe', text: '#1d4ed8' };
        return { bg: '#fef9c3', text: '#a16207' };
    };

    const badge = getStatusStyle(task.status);

    return (
        <div style={cardStyle}>
            <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '600', maxWidth: '70%', wordBreak: 'break-word' }}>
                        {task.title}
                    </h3>
                    <span style={{ backgroundColor: badge.bg, color: badge.text, padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', whiteSpace: 'nowrap' }}>
                        {task.status}
                    </span>
                </div>
                <p style={{ color: darkMode ? '#cbd5e1' : '#475569', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {task.description}
                </p>
            </div>
            <div>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '16px' }}>
                    📅 Created: {task.created_at ? new Date(task.created_at).toLocaleDateString() : new Date().toLocaleDateString()}
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {task.status !== 'Completed' && (
                        <button 
                            onClick={() => onComplete(task._id)}
                            style={{ flex: 1, backgroundColor: '#4f46e5', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}
                        >
                            Complete
                        </button>
                    )}
                    <button 
                        onClick={() => onDelete(task._id)}
                        style={{ flex: 1, backgroundColor: darkMode ? '#451a03' : '#fef2f2', color: '#dc2626', border: 'none', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;