const app = require('./app');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const port = process.env.PORT;

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
