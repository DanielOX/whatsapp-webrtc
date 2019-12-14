const mongoose = require('mongoose')

const FriendSchema = mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    friend_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    conversation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'conversations'
    }

});


module.exports = Friend = mongoose.model('friends', FriendSchema)