const router = require('express').Router()
const mongoose = require('mongoose')
// Load model
const User = require("../../models/User");
const Friend = require('../../models/Friends')
const Conversation = require('../../models/Conversation')

const _ = require('lodash')

// Create Friend

/* args:[ 
        "user_email", 
        "friend_email" 
        ] 
              */

router.post('/create', async (req, res) => {
    // try {


    // } catch (error) {
    //     return res.send({ success: false, error })
    // }

    try {
        let conversation = new Conversation();
        const { user_email, friend_email } = req.body;

        let friend = await User.findOne({ email: friend_email });
        let current_user = await User.findOne({ email: user_email });

        if (await friendExists(current_user._id, friend._id)) {
            throw new Error('You are already friends with ' + friend.name);
        }

        conversation.members.push(...[friend, current_user]);
        conversation = await conversation.save();

        let newFriends = new Friend({ user_id: current_user, friend_id: friend, conversation_id: conversation })
        await newFriends.save(function (err, doc) {
            if (err) return res.send({ success: false, error: 'Unable to this person as your friend' });
            newFriends = new Friend({ user_id: friend, friend_id: current_user, conversation_id: conversation })
            newFriends.save(function (err, doc) {
                if (err) return res.send({ success: false, error: 'Unable to add you as a friend' });
                return res.send({ success: true, friend });
            });
        });



    } catch (error) {
        return res.send({ success: false, error: "unable to find friend with this email" })
    }
});



;

router.get('/list/:user_id', async function (req, res) {
    const { user_id } = req.params;
    let friendsList = await Friend.find({ user_id });
    friendsList = await initFriendDetails(friendsList);
    res.send(friendsList);
});

// Mapping FriendList With Information


const getFriendWithId = _id => {
    return User.findOne({ _id })
}

const getFriendDetails = async _id => {
    return await getFriendWithId(_id)
}

const initFriendDetails = async (friendList) => {
    return await Promise.all(friendList.map(async ({ friend_id, conversation_id }) => {
        const details = await getFriendDetails(friend_id);
        return { ...details._doc, conversation_id }
    }))
}







// Validating If Friend Exists
const friendExists = async (user_id, friend_id) => {
    const friends = await Friend.find({ user_id, friend_id });
    console.log(friends.length > 0)
    return friends.length === 0 ? false : true;
}



module.exports = router