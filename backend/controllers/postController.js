const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.createPost = async (req, res) => {

    try {

        const { content, image } = req.body;

        const post = await Post.create({
            user: req.user.id,
            content,
            image
        });

        res.status(201).json(post);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};
exports.getPosts = async (req, res) => {

    try {

        const posts = await Post.find()
            .populate("user", "username profileImage")
            .sort({ createdAt: -1 });

        res.json(posts);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

exports.updatePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post)
            return res.status(404).json({
                message: "Post not found"
            });

        if (post.user.toString() !== req.user.id)
            return res.status(403).json({
                message: "Unauthorized"
            });

        post.content = req.body.content || post.content;

        await post.save();

        res.json(post);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

exports.deletePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post)
            return res.status(404).json({
                message: "Post not found"
            });

        if (post.user.toString() !== req.user.id)
            return res.status(403).json({
                message: "Unauthorized"
            });

        await post.deleteOne();

        res.json({
            message: "Post deleted"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

exports.addComment = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post)
            return res.status(404).json({
                message: "Post not found"
            });

        const comment = await Comment.create({
            post: post._id,
            user: req.user.id,
            text: req.body.text
        });

        post.comments.push(comment._id);

        await post.save();

        res.status(201).json(comment);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
exports.getComments = async (req, res) => {

    try {

        const comments = await Comment.find({
            post: req.params.id
        })
        .populate("user", "username profileImage")
        .sort({ createdAt: -1 });

        res.json(comments);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
exports.likePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post)
            return res.status(404).json({
                message: "Post not found"
            });

        if (post.likes.includes(req.user.id))
            return res.status(400).json({
                message: "Already liked"
            });

        post.likes.push(req.user.id);

        await post.save();

        res.json({
            message: "Post liked",
            likes: post.likes.length
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.unlikePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post)
            return res.status(404).json({
                message: "Post not found"
            });

        post.likes = post.likes.filter(
            id => id.toString() !== req.user.id
        );

        await post.save();

        res.json({
            message: "Post unliked",
            likes: post.likes.length
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};