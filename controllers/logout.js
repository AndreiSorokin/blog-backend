const router = require('express').Router();
const { authTokenForLogout } = require('../middlewares/authMiddleware');
const { Session } = require('../models');

router.delete('/', authTokenForLogout, async (req, res) => {
   const header = req.headers.authorization;
   const token = header && header.split(' ')[1];

   if (!token) {
      return res.status(400).json({ error: 'No token provided' });
   }

   try {
      const session = await Session.findOne({ where: { token } });
      
      if (!session) {
         return res.status(404).json({ error: 'Session not found' });
      }

      await Session.destroy({ where: { token } });

      res.status(200).json({ message: 'Logged out successfully' });
   } catch (error) {
      console.error('Error logging out:', error);
      return res.status(500).json({ error: 'Failed to log out' });
   }
});

module.exports = router;
