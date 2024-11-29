const { Blog } = require('../models');

const blogFinder = async (req, res, next) => {
   const blog = await Blog.findByPk(req.params.id);
   if (!blog) {
      return res.status(404).send('Blog not found');
   }
   req.blog = blog;
   next();
};

module.exports = { blogFinder };