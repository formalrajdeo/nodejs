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
app.get('/', async (req, res) => {
  try {
    res.json({ message: 'Welcome to HOME PAGE.' })
    res.status(200)
  } catch (error) {
    res.status(404)
    res.send({ error: "Route doesn't exist!" })
  }
})

// ========= METHOD : POST , Todos PAGE =========
app.post('/todos', async (req, res) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'sometoken',
    },
  }

  const Todos = {
    userId: 101,
    title: 'I have created new Todos',
    completed: true,
  }

  try {
    const { data } = await axios.post(
      `https://jsonplaceholder.typicode.com/todos/`,
      Todos,
      config
    )
    console.log(res.data)
    res.send({
      success: true,
      message: `Todos created successfully`,
      results: data,
    })
  } catch (err) {
    console.error(err)
  }
})

// ========= METHOD : GET All =========
app.get('/todos', async (req, res) => {
  try {
    const URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5'
    const response = await axios.get(URL)
    // console.log('Response : ', response)
    const { data } = response

    res.send({
      success: true,
      message: `List of Todos fetched successfully`,
      results: data,
    })
  } catch (error) {
    console.error(error)
  }
})

// ========= METHOD : GET By ID =========
app.get('/todos/:id', async (req, res) => {
  //https://jsonplaceholder.typicode.com/todos/1
  const id = req.params.id

  try {
    const URL = `https://jsonplaceholder.typicode.com/todos/${id}`
    const response = await axios.get(URL)
    // console.log('Response : ', response)
    const { data } = response

    res.send({
      success: true,
      message: `Todos of id number ${id} fetched successfully`,
      results: data,
    })
  } catch (error) {
    console.error(error)
  }
})

// ========= METHOD : PUT/update By ID =========
app.put('/todos/:id', async (req, res) => {
  const id = req.params.id

  // Update TODO object with ID 1
  const updatedTodo = {
    id: id,
    userId: 1,
    title: 'Updated rajdeo title',
    completed: true,
  }
  try {
    const { data } = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      updatedTodo
    )
    console.log(res.data)
    res.send({
      success: true,
      message: `Todos of id number ${id} updated successfully`,
      results: data,
    })
  } catch (err) {
    console.error(err)
  }
})

// ========= METHOD : DELETE By ID =========
app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id

  try {
    const URL = `https://jsonplaceholder.typicode.com/todos/${id}`
    const response = await axios.get(URL)
    // console.log('Response : ', response)
    const { data } = response

    res.send({
      success: true,
      message: `Todos of id number ${id} deleted successfully`,
      results: data,
    })
  } catch (error) {
    console.error(error)
  }
})

// ========= METHOD : DELETE All =========
app.delete('/todos', async (req, res) => {
  try {
    const URL = `https://jsonplaceholder.typicode.com/todos/`
    const response = await axios.get(URL)
    // console.log('Response : ', response)
    const { data } = response

    res.send({
      success: true,
      message: `All Todos deleted successfully`,
      results: data,
    })
  } catch (error) {
    console.error(error)
  }
})

// ========= PORT NO =========
const PORT = 8080
var server = http.createServer(app)
server.listen(PORT, function () {
  console.log('Express server listening on port ' + PORT)
})

module.exports = app
