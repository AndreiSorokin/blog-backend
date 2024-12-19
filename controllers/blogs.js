const router = require('express').Router();
const { Op } = require('sequelize');

const { Blog } = require('../models');
const { User } = require('../models');
const { blogFinder } = require('../middlewares/blogFinderMiddleware');
const { authToken } = require('../middlewares/authMiddleware');

router.put('/:id', blogFinder, async(req, res) => {
   req.blog.likes += 1;
   await req.blog.save();
   res.json(req.blog);
});

router.get('/', async (req, res) => {
   const { search } = req.query;

   const filter = search
      ? {
         [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { author: { [Op.iLike]: `%${search}%` } }
         ]
      }
      : {}
   const blogs = await Blog.findAll({
      where: filter,
      attributes: { exclude: ['userId'] },
      include: {
         model: User,
         attributes: ['name']
      },
      order: [['likes', 'DESC']]
   });
   res.json(blogs);
});

router.get('/:id', blogFinder, (req, res) => {
   res.json(req.blog);
});

router.post('/', authToken, async (req, res) => {
   const { author, url, title, year } = req.body;
   const blog = await Blog.create({
      author,
      url,
      title,
      year,
      userId: req.user.id,
   });

   if(!url || !title || !year) {
      return res.status(400).json({ error: ' url, title, and year are required' });
   }

   res.status(201).json(blog);
});

router.delete('/:id', blogFinder, authToken, async (req, res) => {
   const userId = req.user.id;

   if(req.blog.dataValues.userId !== userId) {
      return res.status(403).json({ error: 'Only authors can delete their blogs' });
   }

   await req.blog.destroy();
   res.status(200).send('Blog deleted successfully');
});

module.exports = router;