const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.deleteComment = async (req, res) => {

    try {

        const comment = await Comment.findById(req.params.id);

        if (!comment)
            return res.status(404).json({
                message: "Comment not found"
            });

        if (comment.user.toString() !== req.user.id)
            return res.status(403).json({
                message: "Unauthorized"
            });

        await Post.findByIdAndUpdate(
            comment.post,
            {
                $pull: {
                    comments: comment._id
                }
            }
        );

        await comment.deleteOne();

        res.json({
            message: "Comment deleted"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};