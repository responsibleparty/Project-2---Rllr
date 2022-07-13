const Following = require("../../models/Following");
const withAuth = require("../../utils/auth");

const router = require("express").Router();

router.post("/",withAuth, async (req, res) => {
    try {
        const userData = await Following.create({
            current_id: req.session.user_id,
            followed_id: req.body.followed_id,
        });
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const userData = await Following.findAll();
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
