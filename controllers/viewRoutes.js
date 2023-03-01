const router = require('express').Router();
const { Post, User, Comment } = require('../models');

//get post on home page join with comments 
router.get('/', (req, res) => {
    try{
        res.render('home', {
            logged_in: req.session.logged_in
        })
    }
    catch(error){
        res.status(500).json(err)
    }

});

//gather post data and include comments and user data
router.get('/', async (req, res) => {
    try {
        let post = await Post.findAll({
            include: [
                {
                    model: Comment, 
                    include: [{ model: User }]
                },
                { model: User}
            ],
        order: [['createdAt', 'DESC']],
        });

    //serialize post data 
        let posts = posts.map(post => {
            const postData = post.get({ plain: true})
            console.log(postData)
            return {
                ...postData,
                commentCount: postData.comment.length,
                commentContent: postData.comments.map(comment => {
                    return comment.content
                }),

                //checks if comment belongs to user that is logged in 
                belongToUser: req.session.user_id === postData.user_id
            }
        });

        res.render('home', {
            posts,
            comments, 
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await Post.findbyPk(req.params.id, {
            include: [
                {
                    model: User, 
                    attributes: ['name',]
                },
            ],
        });

        const post = postData.get({pain: true })
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
    try {
        res.render('login')
    }
    catch (err) {
        res.status(500).json(err)
    };
});

module.exports = router