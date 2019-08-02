const express = require('express');

const PostsRouter = require('./posts/postRouter');

const server = express();

server.use(express.json());
server.use('/posts', PostsRouter);
server.use(logger);

// server.use('/api/users', UserRouter);
server.use('/posts', PostsRouter);

server.get('/', (req, res) => {
  res.send(`
    So far so good!
  `);
});

//custom middleware
function logger(req, res, next) {
  console.log(`Method: ${req.method}, url: ${req.url}, timestamp: [${new Date().toISOString()}]`);
  next();
};


module.exports = server;