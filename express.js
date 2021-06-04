const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')
var http = require('http')
const bodyParser = require('body-parser')
const User = require('./userSchema')

const app = express()
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

// ========= METHOD : GET, HOME PAGE =========
app.get('/', (req, res) => {
  try {
    res.json({ message: 'Welcome to HOME PAGE.' })
    res.status(200)
  } catch (error) {
    res.status(404)
    res.send({ error: "Route doesn't exist!" })
  }
})

// ========= METHOD : POST , USER PAGE =========
app.post('/user', (req, res) => {
  const userInfo = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
  }

  let userModel = new User(userInfo)
  // Save Role in the database
  userModel
    .save()
    .then((doc) => {
      res.send({
        success: true,
        results: doc,
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred while creating the User.',
      })
    })
})

// ========= METHOD : GET All =========
app.get('/user', (req, res) => {
  User.find({})
    .then((doc) => {
      console.log(doc)
      res.send({
        success: true,
        results: doc,
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred while creating the Role.',
      })
    })
})

// ========= METHOD : GET By ID =========
app.get('/user/:id', (req, res) => {
  const id = req.params.id

  User.findOne({ _id: id })
    .then((doc) => {
      console.log(doc)
      res.send({
        success: true,
        results: doc,
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred while retrieving users.',
      })
    })
})

// ========= METHOD : PUT/update By ID =========
app.put('/user/:id', (req, res) => {
  const id = req.params.id

  User.updateOne({ _id: id }, req.body)
    .then((doc) => {
      console.log(doc)
      User.findOne({ _id: id })
        .then((doc) => {
          console.log(doc)
          res.send({
            success: true,
            results: doc,
            doc,
          })
        })
        .catch((err) => {
          console.error(err)
        })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        success: false,
        message:
          err.message ||
          `Cannot update Role with id = ${id}. Maybe Role was not found or req.body is empty!`,
      })
    })
})

// ========= METHOD : DELETE By ID =========
app.delete('/user/:id', (req, res) => {
  const id = req.params.id
  User.deleteOne({ _id: id })
    .then((doc) => {
      console.log(doc)
      res.send({
        success: true,
        results: doc,
        message: `User with id = ${id} has been deleted successfully!`,
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        success: false,
        message:
          err.message ||
          `Cannot delete User with id = ${id}. Maybe User was not found !`,
      })
    })
})

// ========= METHOD : DELETE All =========
app.delete('/user', (req, res) => {
  User.deleteMany()
    .then((nums) => {
      res.send({
        success: true,
        results: nums,
        message: `${nums.deletedCount} Users were deleted successfully!`,
      })
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred while removing all users.',
      })
    })
})

// ========= PORT NO =========
const PORT = 8080

// ========= Connect To DB =========
mongoose
  .connect('mongodb://localhost:27017/userdatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    var server = http.createServer(app)
    server.listen(PORT, function () {
      console.log('Express server listening on port ' + PORT)
    })
  })

module.exports = app
