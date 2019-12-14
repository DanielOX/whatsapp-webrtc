const Conversation = require('../models/Conversation')
const Message = require('../models/Message')
const mongoose = require('mongoose')



module.exports = function (socket) {

  let io = this;

  /*Request:: 
    Get MongoDB Id of currently Connected User */

  socket.emit('GIVE_CLIENT_META_DATA');

  /* Response::
     Join Conversations   */

  socket.on('TAKE_CLIENT_META_DATA', async (user_id) => {
    const conversations = await Conversation.find({ members: mongoose.Types.ObjectId(user_id) })
    conversations.forEach(conversation => socket.join(conversation._id));
  });

  socket.on('MESSAGE', ({ message, conversation_id, user_id }) => {

    io.in(conversation_id).emit('MESSAGE', { message, user_id });

    // Saves new message to MongoDB
    const newMessage = new Message({ conversation_id, body: message, sender_id: user_id });
    newMessage.save()
  });


  socket.on('REQUEST-VIDEO-CALL', ({ conversation_id, caller_information: user }) => {
    socket.to(conversation_id).emit('REQUEST-VIDEO-CALL', { caller_information: user });
  });


  socket.on('CALL-DECLINED', conversation_id => {
    io.in(conversation_id).emit('CALL-DECLINED');
  })

  socket.on('offer', ({ data, conversation_id }) => {
    socket.to(conversation_id).emit('offer', data);
  });

  socket.on('CALL-ACCEPTED', conversation_id => {
    io.in(conversation_id).emit('CALL-ACCEPTED')
  });

  socket.on('VIDEO-CALL-ENDED', function (conversation_id) {
    io.in(conversation_id).emit('DESTROY-VIDEO-CALL-SESSION')
    io.in(conversation_id).emit('VIDEO-CALL-ENDED');

  });


  // socket.on('STREAM-VIDEO-REMOTELY', (stream) => {
  //   ss(socket).to(conversation_id).emit('STREAM-VIDEO-REMOTELY', stream)
  // })
















}