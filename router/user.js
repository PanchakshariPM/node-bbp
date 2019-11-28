const User = require('../models/user')
const express = require('express')
const router = new express.Router()

router.post('/create_user', async (req, res) => {
  try {
    var user = await new User(req.body).save()
    if (!user) {
      return res.status(400).send('Could not create this user')
    }
    res.status(201).send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/get_all_users', async (req, res) => {
  try {
    var allUsers = await User.find()
    if (!allUsers || allUsers.length == 0) {
      return res.status(404).send('Could not find users')
    }

    res.status(200).send(allUsers)
  } catch (e) {
    res.status(500).send(e)
  }
})


router.get('/get_user_by_id/:id', async (req, res) => {
  try {
    var foundUser = await User.findById({ _id: req.params.id })
    if (!foundUser) {
      return req.status(404).send('Could not find this user')
    }

    res.status(200).send(foundUser)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.patch('/update_user_by_id/:id', async (req, res) => {
  try {
    var user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!user) {
      return res.status(404).send('User not found')
    }

    res.status(200).send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.delete('/delete_user_by_id/:id', async (req, res) => {
  try {
    var user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).send('User not found')
    }

    res.status(200).send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router