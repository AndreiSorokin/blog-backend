const Blog = require('./blog');
const User = require('./user');
const ReadingList = require('./readingList');
const Session = require('./session')

User.hasMany(Blog, { foreignKey: 'userId' });
Blog.belongsTo(User, { foreignKey: 'userId' });

User.belongsToMany(Blog, {
   through: ReadingList,
   foreignKey: 'userId',
   as: 'readings',
});
Blog.belongsToMany(User, {
   through: ReadingList,
   foreignKey: 'blogId',
});

ReadingList.belongsTo(Blog, {
   foreignKey: 'blogId',
   as: 'blog',
});

ReadingList.belongsTo(User, {
   foreignKey: 'userId',
   as: 'user',
});



module.exports = {
   Blog,
   User,
   ReadingList,
   Session
}