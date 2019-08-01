const express = require('express');

const PostsRouter = require('./posts/postRouter');

const server = express();

server.use(express.json());
server.use('/posts', PostsRouter);

server.get('/', (req, res) => {
  res.send(`
    So far so good!
  `);
});


module.exports = server;