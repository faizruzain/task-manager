const express = require("express")
const app = express()
const port = process.env.PORT || 3000

// connect to db
require('../src/db/mongoose')

const User = require("../src/model/user")
const Task = require("../src/model/task")
const res = require("express/lib/response")

// express middleware for parsing json
app.use(express.json())

app.get("/", (req, res) => {
  res.send('hellooooo')
  
})

app.post('/users', (req, res) => {
  console.log(req.body)

  const data = {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password
  }

  const user = new User(data)
  user.save().then((result) => {
    console.log(result);
    res.status(201).send('a new user has been saved')

  }).catch((err) => {
    res.status(400).send(err)
  })

})

app.get('/tasks', ((req, res) => {
  const task = Task.find()
  task.then((result) => {
    res.status(200).send(result)

  }).catch((err) => {
    res.status(400).send((err))

  })

}))

app.get('/tasks/:id', ((req, res) => {
  const id = req.params.id
  const task = Task.findOne({id: id})
  task.then((result) => {
    res.status(200).send(result)

  }).catch((err) => {
    res.status(400).send((err))

  })

}))

app.post('/tasks', (req, res) => {
  console.log(req.body)

  const data = {
    desc: req.body.desc
  }

  const task = new Task(data)
  task.save().then((result) => {
    console.log(result);
    res.status(201).send('Task has been saved')

  }).catch((err) => {
    res.status(400).send(err)
  })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
