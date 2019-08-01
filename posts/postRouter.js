const express = require('express');
const db = require('./postDb')
const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res
        .status(500)
        .json({ error: `The posts information could not be retrieved ${err}` })
    );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res
        .status(500)
        .json({ error: `The posts information could not be retrieved ${err}` })
    );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(post =>
      post
        ? res.status(200).json(post)
        : res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." })
    )
    .catch(err =>
      res.status(500).json({ error: "The post could not be removed" })
    );
});

//update post
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if (!id)
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  if (!title || !contents)
    res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post."
      });
  const updatedPost = { title, contents };
  db.update(id, updatedPost)
    .then(response =>
      response
        ? res.status(200).json(response)
        : res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." })
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: "The post information could not be modified." })
    );
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;