const Blog = require('./blog');
const User = require('./user');

Blog.sync();
User.sync();

User.hasMany(Blog, { foreignKey: 'userId' });
Blog.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
   Blog,
   User
}