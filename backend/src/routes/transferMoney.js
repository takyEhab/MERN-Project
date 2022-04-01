const express = require('express');
const router = express.Router()
const User = require('../models/user')
const verifyToken = require('../middleware/auth')

// send money to some user_id
// complete error handling 
router.post('/send/:name', verifyToken, async (req, res) => {
  try {

    const amount = Number(req.query.amount)

    const sendTo = await User.findOneAndUpdate({ "username": req.params.name },
      { $inc: { cash: +amount }, $push: { notifications: { message: `${amount}$ RECEIVED from ${req.myInfo.me.username}` } } },
      { new: true }).catch(err => console.log(err))

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