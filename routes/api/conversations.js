const router = require('express').Router()
const Conversation = require('../../models/Conversation')
const User = require('../../models/User')


/* args:[ 
        ..."objectId()"
        ] 
              */

router.post('/create', (req, res) => {

    const { Members } = req.body;

    const conversation = new Conversation()

    /* Find Users With Email @Array */

    conversation.members.push(...Members);

    /* @Boolean { sucess:boolean } 
        Save Record To Database */

    conversation
        .save()
        .then((response) => { res.send({ success: true }) })
        .catch((response) => { res.send({ success: false }) })

});

























module.exports = router;