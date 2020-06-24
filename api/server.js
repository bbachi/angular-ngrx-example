const express = require('express');
const path = require('path');
const app = express(),
      randomId = require('random-id')
      bodyParser = require("body-parser");
      port = 3080;

const idlen = 10;
// place holder for the data
const users = [];
let tasks = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../ui/build')));

app.get('/api/users', (req, res) => {
  console.log('api/users called!')
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user:::::', user);
  users.push(user);
  res.json("user addedd");
});

app.post('/api/login', (req, res) => {
  const user = req.body.user;
  console.log('Adding user:::::', user);
  const usersFound = users.filter(usr => usr.email === user.email && usr.password === user.password);
  if (usersFound.length > 0) {
    res.json({status: true, message: 'user found'});
  } else {
    res.json({status: false, message: 'user not found'});
  }
});

app.post('/api/signup', (req, res) => {
  const user = req.body.user;
  console.log('Adding user:::::', user);
  users.push(user);
  res.json({status: true, numberOfUsers: users.length});
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/task', (req, res) => {
  const task = req.body.task;
  const id = randomId(idlen);
  task.id = id;
  tasks.push(task);
  res.json({status:true, message: `task ${task.id} addedd`});
});

app.delete('/api/task/:id', (req, res) => {
  console.log('deleting task:::', req.params.id);
  const id = req.params.id;
  tasks = tasks.filter(tsk => tsk.id !== id)
  res.json({status:true, message: `task ${id} deleted`});
});

app.put('/api/task', (req, res) => {
  const task = req.body.task;
  tasks = tasks.map(tsk => {
      if(tsk.id === task.id) tsk = task;
      return tsk;
  });
  res.json({status:true, message: `task ${task.id} edited`});
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../ui/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});