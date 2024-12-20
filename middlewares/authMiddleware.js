const jwt = require('jsonwebtoken');
const { User, Session } = require('../models');
const { JWT_SECRET } = require('../util/config');

const authToken = async (req, res, next) => {
   const header = req.headers.authorization;
   const token = header && header.split(' ')[1];

   if (!token) return res.status(401).send('Invalid token');

   try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const user = await User.findByPk(decodedToken.userId);

      if (!user) {
         return res.status(403).json({ error: 'User not found' });
      }

      const session = await Session.findOne({ where: { token } });

      if (!session) {
         return res.status(401).json({ error: 'Invalid or expired token' });
      }

      if (user.disabled) {
         return res.status(403).json({ error: 'User disabled' });
      }

      req.user = user;
      next();
   } catch (error) {
      return res.status(401).json({ error: 'Invalid or expired token' });
   }
}

const authTokenForLogout = async (req, res, next) => {
   const header = req.headers.authorization;
   const token = header && header.split(' ')[1];

   if (!token) return res.status(401).send('Invalid token');

   try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const user = await User.findByPk(decodedToken.userId);

      if (!user) {
         return res.status(403).json({ error: 'User not found' });
      }

      req.user = user;
      next();
   } catch (error) {
      return res.status(401).json({ error: 'Invalid or expired token' });
   }
};

module.exports = { authToken, authTokenForLogout };