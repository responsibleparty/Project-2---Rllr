const {
    restore
} = require("../../models/User");
const User = require("../../models/User");

const router = require("express").Router();

// SIGN UP
router.post("/", async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.su_username,
            password: req.body.su_pwd,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.username = req.body.su_username
            res.status(200).json(userData);
        });
    } catch (error) {
        res.status(400).json(error);
        console.log("fail");
    }
});

// LOG IN
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.lg_username
            },
        });
     
        if (!userData) {
            res.status(400).json({
                message: "NO user found"
            });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.lg_pwd);
        if (!validPassword) {
            res.status(400).json({
                message: "Incorrect Password! try again"
            });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.currentUser = req.body.lg_username;
            res.status(200).json({
                user: userData,
                message: "You are now logged in!"
            });
        });
    } catch (error) {
       
        res.status(500).json(error);
    }
});
// LOG OUT
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// get user
router.get('/:username', async (req,res)=>{
    try {
        const userData = await User.findOne({
            where: {
                username: req.params.username
            },
            attributes:{exclude:['password']}
        });
        if (!userData) {
            res.status(400).json({
                message: "NO user found"
            });
            return;
        }
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/', async (req,res)=>{
    try {
        const userData = await User.findAll(
            {
                attributes:{exclude:['password']},
                include:[
                {association:'follow', attributes:{exclude:['password']}},
                {association:'followed', attributes:{exclude:['password']}}
            ]
        
        }
        )

        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;