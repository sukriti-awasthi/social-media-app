const User = require("../models/User");

exports.getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.followUser = async (req, res) => {
    try {

        const userToFollow = await User.findById(req.params.id);

        const currentUser = await User.findById(req.user.id);

        if (!userToFollow)
            return res.status(404).json({
                message: "User not found"
            });

        if (req.user.id === req.params.id)
            return res.status(400).json({
                message: "You cannot follow yourself"
            });

        if (currentUser.following.includes(req.params.id))
            return res.status(400).json({
                message: "Already following"
            });

        currentUser.following.push(req.params.id);

        userToFollow.followers.push(req.user.id);

        await currentUser.save();

        await userToFollow.save();

        res.json({
            message: "User followed successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

exports.unfollowUser = async (req, res) => {

    try {

        const userToUnfollow = await User.findById(req.params.id);

        const currentUser = await User.findById(req.user.id);

        if (!userToUnfollow)
            return res.status(404).json({
                message: "User not found"
            });

        currentUser.following = currentUser.following.filter(
            id => id.toString() !== req.params.id
        );

        userToUnfollow.followers = userToUnfollow.followers.filter(
            id => id.toString() !== req.user.id
        );

        await currentUser.save();

        await userToUnfollow.save();

        res.json({
            message: "User unfollowed successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
exports.getUserById = async (req, res) => {

    try {

        const user = await User.findById(req.params.id)
            .select("-password");

        if (!user)
            return res.status(404).json({
                message: "User not found"
            });

        res.json(user);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};