const router = require('express').Router();
const req = require('express/lib/request');
const sequelize = require('../config/connection');
const { User, Post, Comment, Likes } = require('../models');
const withAuthentication = require('../utils/auth');

//GET route for the dashboard page
router.get('/', withAuthentication, (req,res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
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
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({plain: true}));
        res.render('/dashboard', { posts, loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET route to edit one of your post
router.get('/edit/:id', withAuthentication, (req, res) => {
    Post.findByPk(req.params.id, {
        attributes: [
            'id',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE post.id = likes.post_id)'), 'likes_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id','comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });

            res.render('edit-post', {
                post,
                loggedIn
            });
        } else {
            res.status(404).end();
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//POST route to send an email
router.post('/send', function (req, res, next) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: req.session.user_id,
            pass: req.session.password
        }
    })

    const mailOptions = {
        from: `${req.body.email}`,
        to: '',
        subject: `${req.body.name}`,
        text: `${req.body.message}`,
        replyTo: `${req.body.email}`
    }

    transporter.sendMail(mailOptions, function(err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log('here is the res: ', res);
        }
    })
});

module.exports = router;