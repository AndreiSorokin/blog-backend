const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const { User } = require('../models');

router.post('/', async(req, res) => {
   const { username, password } = req.body;
   const user = await User.findOne({ where: { username } });

   if (!user ||!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
   };

   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
   res.status(200).json({
      token,
      username: user.username,
      name: user.name
   });
});

module.exports = router