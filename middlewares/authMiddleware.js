const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { JWT_SECRET } = require('../util/config');

const authToken = async (req, res, next) => {
   const header = req.headers.authorization;
   const token = header && header.split(' ')[1];

   if (!token) return res.status(401).send('Invalid token');

   const decodedToken = jwt.verify(token, JWT_SECRET);
   const user = await User.findByPk(decodedToken.userId);

   if (!user) {
      return res.status(403).json({ error: 'User not found' });
   }

   req.user = user;
   next();
}

module.exports = { authToken };