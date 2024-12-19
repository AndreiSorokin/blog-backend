const router = require('express').Router();

const { ReadingList } = require('../models');
const { authToken } = require('../middlewares/authMiddleware');
const { Blog } = require('../models');

router.get('/', authToken, async (req, res) => {
   const readingList = await ReadingList.findAll({
      where: { userId: req.user.id },
      include: {
         model: Blog,
         attributes: ['title', 'author'],
         as: 'blog'
      },
   });

   res.status(200).json(readingList);
});

router.get('/:id', authToken, async (req, res) => {
   const { id } = req.params;

   const readingListEntry = await ReadingList.findByPk(id, {
      where: { userId: req.user.id },
      include: {
         model: Blog,
         attributes: ['title', 'author'],
         as: 'blog'
      },
   });

   if (!readingListEntry || readingListEntry.userId!== req.user.id) {
      return res.status(404).json({ error: 'Reading list entry not found' });
   }

   res.status(200).json(readingListEntry);
})


router.post('/', authToken, async (req, res) => {
   const { blogId } = req.body;

   if (!blogId) {
      return res.status(400).json({ error: 'Can not find the blog' });
   }

   const readingListEntry = await ReadingList.create({
      userId: req.user.id,
      blogId,
   });

   res.status(201).json(readingListEntry);
});

router.put('/:id', authToken, async (req, res) => {
   const { id } = req.params;
   const { read } = req.body;

   const readingListEntry = await ReadingList.findByPk(id, {
      where: { userId: req.user.id },
      include: {
         model: Blog,
         attributes: ['title', 'author'],
         as: 'blog'
      },
   });

   if (!readingListEntry || readingListEntry.userId !== req.user.id) {
      return res.status(404).json({ error: 'Reading list entry not found' });
   }

   readingListEntry.read = read;
   await readingListEntry.save();

   res.status(200).json(readingListEntry);
});

module.exports = router;