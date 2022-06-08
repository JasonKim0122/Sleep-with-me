const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment, Likes } = require('../../models');
const withAuthentication = require('../../utils/auth');

//GET route for all users
router.get('/', (req,res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'), 'likes_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                },
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET route for a single user
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'), 'likes_count']
        ],
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'There was no post found with this id'});
            return;
        }

        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//POST route
router.post('/', withAuthentication, (req, res) => {
    Post.create({
        title: req.body.title,
        user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//PUT route for liking posts
router.put('/likes', withAuthentication, (req, res) => {
    Post.likes({ ...req.body, user_id: req.session.user_id }, { Likes, Comment, User })
    .then(updatedLikesData => res.json(updatedLikesData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//PUT route for updating posts
router.put('/:id', withAuthentication, (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'There is no post found with this id'});
            return;
        }

        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//DELETE route to delete a post
router.delete('/:id', withAuthentication, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'There is no post found with this id'});
            return;
        }

        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;