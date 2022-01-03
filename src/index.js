const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});

const jwt = require('jsonwebtoken');

const myFunction = async () => {
  const token = jwt.sign({ _id: 'abc123' }, process.env.JWT_SECRET, {
    expiresIn: '7 days',
  });
  console.log(token);

  const data = jwt.verify(token, process.env.JWT_SECRET);
  console.log(data);
};

myFunction();
