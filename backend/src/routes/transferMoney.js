const express = require('express');
const router = express.Router()
const User = require('../models/user')
const verifyToken = require('../middleware/auth')

// send money to some user_id
// complete error handling 

router.post('/send/:name', verifyToken, async (req, res) => {
  try {

    const amount = Number(req.query.amount)

    if (Math.sign(amount) != 1) {
      return res.status(400).json({ message: 'Sending cash must be positive number' })
    }
    if (req.myInfo.me.cash < amount) {
      return res.status(406).json({ message: 'You don\'t have enough money' })
    }

    const sendTo = await User.findOneAndUpdate({ "username": req.params.name },
      { $inc: { cash: +amount }, $push: { notifications: { message: `${amount}$ RECEIVED from ${req.myInfo.me.username}` } } },
      { new: true })

    if (!sendTo) return res.status(404).json({ message: 'User is not found' })


    const me = await User.findByIdAndUpdate(req.myInfo.me._id,
      { $inc: { cash: -amount }, $push: { notifications: { message: `${amount}$ SENT to ${sendTo.username}` } } },
      { new: true, runValidators: true })

    res.status(200).json({ me, sendTo })
  } catch (err) {
    // err.name === 'CastError' ? res.status(404).json({ message: 'user not found' }) : res.status(500).json({
    //   message: err.message
    res.status(500).json({ message: err.message })
    // res.status(500).json(err)
  }
});



module.exports = router