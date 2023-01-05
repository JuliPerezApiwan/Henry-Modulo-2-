// const bodyParser = require("body-parser");
const express = require("express");
const {
  posts,
  createPost, 
  getPosts,
  getAuthorPosts,
  getAuthorPostsTitle,
  updatePost,
  deletePost,
  deleteAuthor,
} = require ("./controllers")


const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.


const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

/***************** Routes */

///// POST

server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;
  try {
    const newPost = createPost(author, title, contents)
    res.status(200).json(newPost)
  } catch (error) {
    res.status(STATUS_USER_ERROR).json({ error: error.message })

  }
})

server.post("/posts/author/:author", (req, res) => {
  const { title, contents } = req.body;
  const { author } = req.params;
  try {
      const newPost = createPost(author, title, contents,)
      posts.push(newPost);
      res.status(200).json(newPost)
  } catch (error) {
    res.status(STATUS_USER_ERROR).json({ error: error.message })
  }
})

////// GET


server.get("/posts", (req, res) => {
  const { term } = req.query;
  const results = getPosts(term);
  res.status(200).json(results);
});

server.get("/posts/:author", (req, res) => {
  const { author } = req.params;
  try{
    const result = getAuthorPosts(author)
    res.status(200).json(result);
  } catch (error) {
    res.status(STATUS_USER_ERROR).json({ error: error.message })
  }
});


server.get("/posts/:author/:title", (req, res) => {
  const {author, title} = req.params;
  try {
    const result = getAuthorPostsTitle (author, title)
    res.status(200).json(result)
  } catch (error) {
    res.status(STATUS_USER_ERROR).json({error: error.message})
  }
})

///// PUT

server.put("/posts", (req, res) => {
const { id, title, contents } = req.body
try {
  const result = updatePost(id, title, contents)
  res.status(200).json(result)
} catch (error) {
  res.status(STATUS_USER_ERROR).json({error: error.message})
}
})

//// DELETE

server.delete("/posts", (req, res) => {
const { id } = req.body;
try {
  deletePost(id);
  res.status(200).json({success: true})
} catch (error) {
  res.status(STATUS_USER_ERROR).json({error: error.message})
}
})

server.delete("/author", (req, res) => {
  const { author } = req.body;
  try {
    const deletedPosts = deleteAuthor(author);
    res.status(200).json(deletedPosts);
  } catch (error) {
    res.status(STATUS_USER_ERROR).json({ error: error.message });
  }
});




module.exports = { posts, server };
