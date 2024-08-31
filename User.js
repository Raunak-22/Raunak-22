const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Student', 'Alumni'],
        required: true,
    },
    skills: {
        type: [String],
    },
    experience: {
        type: String,
    },
    expertise: {
        type: String,
    },
    connections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
});

module.exports = mongoose.model('User', UserSchema);
