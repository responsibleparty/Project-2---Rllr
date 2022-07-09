const {
    Post
} = require('../../models');
const withAuth = require('../../utils/auth')
const router = require('express').Router();
// CREATE POST
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        })
        res.status(200).json(newPost)
    } catch (error) {
        res.status(400).json(error)
    }
})
// DELETE post with id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        })
        if (!postData) {
            res.status(404).json({
                message: 'No project found with this id!'
            })
            return
        }
        res.status(200).json(postData)

    } catch (error) {
        res.status(500).json(error)
    }
})
// UPDATE POST WITH ID
router.put('/:id', withAuth, async (req, res) => {
    try {
        console.log(req.body);
        const postData = await Post.update({
            name: req.body.name,
            description: req.body.description,
            user_id: req.session.user_id
        }, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        })

        if (!postData) {
            res.status(404).json('not found')
            return
        }
        res.status(200).json(postData)

    } catch (error) {
        res.status(500).json(error)
    }
})
// GET POST via id
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        const thePost = postData.get({
            plain: true
        })
        res.status(200).json(thePost);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;