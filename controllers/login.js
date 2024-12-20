const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const { User, Session } = require('../models');
const { JWT_SECRET } = require('../util/config');

router.post('/', async (req, res) => {
   const { username, password } = req.body;

   const user = await User.findOne({ where: { username } });

   if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
   }

   const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

   const expiresAt = new Date(Date.now() + 3600000);
   
   await Session.create({
      userId: user.id,
      token,
      expiresAt
   });

   res.status(200).json({
      token,
      username: user.username,
      name: user.name
   });
});

module.exports = router;
