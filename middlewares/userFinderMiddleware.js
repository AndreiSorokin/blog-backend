const { User } = require('../models');

const userFinder = async (req, res, next) => {
   const user = User.findByPk(req,process_params.id);
   if(!user) {
      return res.status(404).send('User not found');
   }
   req.user = user;
   next();
}

module.exports = { userFinder };