const Blog = require('./blog');
const User = require('./user');
const ReadingList = require('./readingList');

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




module.exports = {
   Blog,
   User,
   ReadingList
}