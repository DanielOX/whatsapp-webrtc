const router = require('express').Router()
const Message = require('../../models/Message')


/* args:[ 
    "conversation_id",
    "body",
    "sender_id"
    ] 
*/

router.post('/create', (req, res) => {

    const { conversation_id, body, sender_id } = req.body;

    res.send({ conversation_id, body, sender_id });

    const message = new Message({ body, conversation_id, sender_id })
    message
        .save()
        .then(res => { res.send({ success: true }) })

});


router.get('/:conversation_id', async (req, res) => {
    const { conversation_id } = req.params;

    const chat = await Message.find({ conversation_id })
    res.send(chat)
});




module.exports = router