// Aquire necessary things to run
const sequelize = require('../config/connection');
const { User, Comment, Post } = require('../models');

// Aquire json data from seeds 
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true})

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const post = await Post.bulkCreate(postData, {
        individualHooks: true,
        returning: true,
    })

    const comments = await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
    });

console.log(users, post, comments);
    process.exit(0)
};

seedDatabase();
