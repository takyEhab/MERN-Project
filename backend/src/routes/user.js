const express = require('express');
const router = express.Router()
const User = require('../models/user')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifyToken = require('../middleware/auth')

//seen message
router.post('/seen_message/:id', verifyToken, async (req, res) => {
  const id = req.params.id

  // try {
  //   const response = User.findOneAndUpdate(
  //     { "_id": req.myInfo.me._id, "notifications._id": id },
  //     {
  //       "$set": {
  //         "notifications.$.seen": true
  //       }
  //     });
  //   res.status(200).json({ response })
  // } catch (err) {
  //   res.status(500).json({ err: err.message, mes: 'error', id: req.myInfo.me._id })
  // }
  User.findById(req.myInfo.me._id)
    .then((user) => {
      const notifications = user.notifications.id(id); // returns a matching subdocument
      if (!notifications) throw new Error('Didn\'t find message with this id');
      // return res.status(404).json({ message: 'Didn\'t find message with this id' })
      notifications.seen = true // updates the address while keeping its schema       
      // address.zipCode = req.body.zipCode; // individual fields can be set directly

      return user.save(); // saves document with subdocuments and triggers validation
    })
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch(e => res.status(400).json({ message: e.message }));


  // res.status(200).json({ myInfo: req.myInfo.me, id })
})

// get all users "protected route"
router.get('/', verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
// get myInfo 
router.get('/profile', verifyToken, async (req, res) => {
  // try {
  //   const user = await User.findById(req.params.id)
  //   if (!user) return res.sendStatus(404);
  //   res.status(200).json(user)
  // } catch (err) {
  //   err.name === 'CastError' ? res.sendStatus(404) : res.status(500).json({ message: err.message });
  // }
  res.status(200).json(req.myInfo)
})

// logging
router.post("/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send("username and password are required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        { expiresIn: "3d" }
      );
      // user
      res.status(200).json({ user, token });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

// registering
router.post('/register', async (req, res) => {
  try {
    const { username, password, password2 } = req.body;
    if (!(username && password && password2)) {
      res.status(400).send('username and password and password2 are required');
    }

    if (await User.findOne({ username })) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    if (password !== password2) {
      res.status(400).send('password must match');
    }
    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      { expiresIn: "3d" }
    );

    // return new user
    res.status(201).json({ user, token });

  } catch (err) {
    res.status(500).json(err)
  }
})

// deleting user
router.delete('/:id', async (req, res) => {
  return res.send('fuck off')
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.sendStatus(404);
    res.status(200).json({ user, message: 'user deleted' });
  } catch (err) {
    err.name === 'CastError' ? res.sendStatus(404) : res.status(500).json({ message: err.message });
  }
})

module.exports = router