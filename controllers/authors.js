const { Blog } = require('../models');
const { sequelize } = require('../util/db');
const router = require('express').Router();

router.get('/', async (req, res) => {
   const authors = await Blog.findAll({
      attributes: [
         'author',
         [sequelize.fn('COUNT', sequelize.col('id')), 'blogs'],
         [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
      ],
      group: ['author'],
      order: [[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']]
   });
   res.status(200).json(authors);
});

module.exports = router;
