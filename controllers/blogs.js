const router = require('express').Router();
const { Blog } = require('../models');
const { blogFinder } = require('../middlewares/blogFinderMiddleware');
const { authToken } = require('../middlewares/authMiddleware');

router.put('/:id', blogFinder, async(req, res) => {
   req.blog.likes += 1;
   await req.blog.save();
   res.json(req.blog);
});

router.get('/', async (req, res) => {
   const blogs = await Blog.findAll();
   res.json(blogs);
});

router.get('/:id', blogFinder, (req, res) => {
   res.json(req.blog);
});

router.post('/', authToken, async (req, res) => {
   const { author, url, title } = req.body;
   console.log('USER ID: ', req.user.id)
   const blog = await Blog.create({
      author,
      url,
      title,
      userId: req.user.id
   });
   res.status(201).json(blog);
});

router.delete('/:id', blogFinder, async (req, res) => {
   await req.blog.destroy();
   res.status(200).send('Blog deleted successfully');
});

module.exports = router;