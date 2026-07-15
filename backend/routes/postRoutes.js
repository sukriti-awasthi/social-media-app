const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    addComment,
    getComments,
    likePost,
    unlikePost
} = require("../controllers/postController");

router.post("/", auth, createPost);

router.get("/", getPosts);

router.put("/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

router.post("/:id/comment", auth, addComment);

router.get("/:id/comments", getComments);

router.post("/:id/like", auth, likePost);

router.post("/:id/unlike", auth, unlikePost);

module.exports = router;