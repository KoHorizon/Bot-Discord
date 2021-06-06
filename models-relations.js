const sequelize = require('./database');

const User = require('./models/User');
const Task = require('./models/Task');
const Address = require('./models/Address');
const UserHasAddress = require('./models/UserHasAddress');


// Relation User to Task
User.hasMany(Task);
Task.belongsTo(User);

// Relation User to Address
User.belongsToMany(Address, { through: UserHasAddress });
Address.belongsToMany(User, { through: UserHasAddress });

sequelize.sync({alter: true});