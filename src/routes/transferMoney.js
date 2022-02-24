const express = require('express');
const router = express.Router()
const User = require('../models/user')
const verifyToken = require('../middleware/auth')

// send money to some user_id
// complete error handling 
router.get('/send/:id', verifyToken, async(req, res) => {    
  try {
    const amount = Number(req.query.amount)

    const me = await User.findByIdAndUpdate(req.myInfo.me._id, {$inc:{cash: -amount}}, {
      new: true,
      runValidators: true,
      // context: 'query'
    })
    const sendTo = await User.findByIdAndUpdate(req.params.id, {$inc:{cash : +amount}}, {
      new: true,
      runValidators: true,
      // context: 'query'
    })

    res.status(200).json({me, sendTo})
  } catch (err) {
    err.name === 'CastError' ? res.sendStatus(404) : res.status(500).json({ message: err.message});
  }
})

module.exports = router