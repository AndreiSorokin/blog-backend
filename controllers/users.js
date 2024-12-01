const router = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../models');
const { Blog } = require('../models');
const { userFinder } = require('../middlewares/userFinderMiddleware');

router.get('/', async (req, res) => {
   const users = await User.findAll({
      include: {
         model: Blog,
         attributes: {
            exclude: ['userId']
         }
      }
   });
   res.json(users);
});

router.get('/:username', userFinder, (req, res) => {
   res.json(req.user)
});

router.post('/', async(req, res) => {
   const { name, username, password } = req.body;

   if (!name || !username || !password) {
      return res.status(400).json({ error: 'Name, username, and password are required' });
   }

   const hashedPassword = await bcrypt.hash(password, 7);

   const newUser = await User.create({ name, username, password: hashedPassword });
   res.status(201).json(newUser);
});

router.put('/:username', userFinder, async(req, res) => {
   const { username } = req.body;

   if (!username) {
      return res.status(400).json({ error: 'New username is required' });
   }

   await req.user.update({ username });
   res.status(200).json({ message: 'Username updated successfully' })
});

router.delete('/:username', userFinder, async(req, res) => {
   await req.user.destroy();
   res.status(200).send('User deleted successfully');
})

module.exports = router;