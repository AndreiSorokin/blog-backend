const { User, ReadingList, Blog } = require('../models');

const userFinder = async (req, res, next) => {
   const { username } = req.params; 

   const user = await User.findOne({
      where: { username },
      include: [
         {
            model: Blog,
               as: 'readings',
               through: {
                  model: ReadingList,
                  attributes: ['read', 'id'],
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