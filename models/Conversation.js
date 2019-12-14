const mongoose = require('mongoose')

const ConversationSchema = mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ]
});


module.exports = Conversation = mongoose.model('conversations', ConversationSchema);