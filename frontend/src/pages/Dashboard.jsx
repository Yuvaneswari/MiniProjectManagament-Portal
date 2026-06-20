import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import { fetchTasks, updateTaskStatus, deleteTask } from '../services/api';

const Dashboard = ({ navigate, darkMode }) => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // ✅ FIXED: defined OUTSIDE useEffect
    const loadTasks = async () => {
        try {
            setLoading(true);

            const data = await fetchTasks();

            // Handles both formats: [] OR { data: [] }
            const taskList = Array.isArray(data) ? data : data.data || [];

            setTasks(taskList);
            setError('');

        } catch (err) {
            console.log("Backend failed → loading from localStorage");

            const localTasksRaw = localStorage.getItem('demo_tasks');
            const localTasks = localTasksRaw ? JSON.parse(localTasksRaw) : [];

            setTasks(localTasks);
            setError('');
        } finally {
            setLoading(false); // ✅ FIXED loader
        }
    };

    // ✅ Runs once
    useEffect(() => {
        loadTasks();
    }, []);

    const handleComplete = async (id) => {
        try {
            await updateTaskStatus(id, 'Completed');
        } catch (err) {
            // ✅ fallback local update
            const updated = tasks.map(t =>
                t._id === id ? { ...t, status: 'Completed' } : t
            );
            localStorage.setItem('demo_tasks', JSON.stringify(updated));
        }

        loadTasks(); // ✅ refresh
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(id);
            } catch (err) {
                // ✅ fallback local delete
                const updated = tasks.filter(t => t._id !== id);
                localStorage.setItem('demo_tasks', JSON.stringify(updated));
            }

            loadTasks(); // ✅ refresh
        }
    };

    const filteredTasks = tasks.filter(
        task => filter === 'All' || task.status === filter
    );

    return (
        <div>
            {/* HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                
                {/* FILTER BUTTONS */}
                <div>
                    {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            style={{
                                marginRight: '10px',
                                padding: '8px 12px',
                                background: filter === status ? '#4f46e5' : '#ccc',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* ADD BUTTON */}
                <button onClick={() => navigate('add')}>
                    + Add Task
                </button>
            </div>

            {/* ERROR */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* LOADING */}
            {loading ? (
                <p>Loading...</p>

            ) : filteredTasks.length === 0 ? (

                <p>No Tasks Available</p>

            ) : (

                <div>
                    {filteredTasks.map(task => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onComplete={handleComplete}
                            onDelete={handleDelete}
                            darkMode={darkMode}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;