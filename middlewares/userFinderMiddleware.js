const { User, ReadingList, Blog } = require('../models');

const userFinder = async (req, res, next) => {
   const { id } = req.params;
   const { read } = req.query;
   const { query } = { where: { id } };

   const user = await User.findOne({
      query,
      where: { id },
      include: [
         {
            model: Blog,
               as: 'readings',
               through: {
                  model: ReadingList,
                  attributes: ['read', 'id'],
                  where: read !== undefined ? { read: read === 'true' } : undefined
               },
               attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
         },
      ],
   });

   if(!user) {
      return res.status(404).send('User not found');
   }
   console.log('User data:', JSON.stringify(user, null, 2));
   req.user = user;
   next();
}

module.exports = { userFinder };