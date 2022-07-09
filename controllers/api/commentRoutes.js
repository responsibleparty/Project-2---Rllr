const withAuth = require('../../utils/auth')
const router = require('express').Router();
const Comment = require('../../models/Comment')


// CREATE COMMENTS
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            description: req.body.description,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        res.json(req.body)
    } catch (error) {
        res.status(500).json(error)
    }
})
// DELETE COMMENT
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        })

        if (!postData) {
            res.status(404).json({
                message: 'No comment found with this id!'
            })
            return
        }
        res.status(200).json(postData)

    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router;