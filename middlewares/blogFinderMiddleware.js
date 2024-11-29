const { Blog } = require('../models');

const blogFinder = async (req, res, next) => {
   try {
      const blog = await Blog.findByPk(req.params.id);
      if(!blog) {
         return res.status(404).send('Blog not found');
      }
      req.blog = blog;
      next();
   } catch (e) {
      console.error(`Error finding blog: ${e}`);
      res.status(500).send('Error finding blog');
   }
};

module.exports = { blogFinder };