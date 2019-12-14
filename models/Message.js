const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({

    body: {
        type: String,
        required: true
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    conversation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'conversations'
    }
});


module.exports = Message = mongoose.model('messages', MessageSchema);