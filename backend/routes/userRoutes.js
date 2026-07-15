const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
    getProfile,
    followUser,
    unfollowUser,
    getUserById
} = require("../controllers/userController");

router.get("/profile", auth, getProfile);
router.get("/:id", getUserById);

router.post("/follow/:id", auth, followUser);

router.post("/unfollow/:id", auth, unfollowUser);

module.exports = router;