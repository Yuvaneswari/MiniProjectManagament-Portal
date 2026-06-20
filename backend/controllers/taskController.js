import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
    try {
        const { search, sort, page = 1, limit = 6 } = req.query;
        let query = {};

        // 1. Live Text Search Filter
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        // 2. Pagination Calculations
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const totalTasks = await Task.countDocuments(query);

        // 3. Sorting Engine Setup
        let sortOrder = -1; // Default Newest First
        if (sort === 'oldest') sortOrder = 1;

        const tasks = await Task.find(query)
            .sort({ created_at: sortOrder })
            .skip(skip)
            .limit(parseInt(limit));

        // 4. Dashboard Statistics Aggregation
        const allStats = await Task.find({});
        const stats = {
            total: allStats.length,
            pending: allStats.filter(t => t.status === 'Pending').length,
            inProgress: allStats.filter(t => t.status === 'In Progress').length,
            completed: allStats.filter(t => t.status === 'Completed').length
        };

        res.status(200).json({
            tasks,
            stats,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalTasks / limit)
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve tasks', error: error.message });
    }
};

// Keep existing createTask, updateTaskStatus, and deleteTask methods...
export const createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    } catch (error) { res.status(400).json({ message: error.message }); }
};

export const updateTask = async (req, res) => {
    try {
        const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (error) { res.status(400).json({ message: error.message }); }
};

export const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) { res.status(400).json({ message: error.message }); }
};