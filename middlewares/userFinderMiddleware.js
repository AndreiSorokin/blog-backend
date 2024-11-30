const { User } = require('../models');

const userFinder = async (req, res, next) => {
   const user = await User.findOne({ where: { username: req.params.username } });
   if(!user) {
      return res.status(404).send('User not found');
   }
   req.user = user;
   next();
}

module.exports = { userFinder };