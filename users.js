const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/register', async (req, res) => {
    const { name, role, skills, experience, expertise } = req.body;

    try {
        let user = new User({ name, role, skills, experience, expertise });
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Get all mentors
router.get('/mentors', async (req, res) => {
    try {
        const mentors = await User.find({ role: 'Alumni' });
        res.json(mentors);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Connect a student with a mentor
router.post('/connect', async (req, res) => {
    const { studentId, mentorId } = req.body;

    try {
        let student = await User.findById(studentId);
        let mentor = await User.findById(mentorId);

        if (!student || !mentor) {
            return res.status(404).json({ msg: 'User not found' });
        }

        student.connections.push(mentor);
        await student.save();

        res.json(student);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
