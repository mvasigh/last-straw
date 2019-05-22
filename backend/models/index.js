import Sequelize from 'sequelize';

// Connecting to the Database
// Development
const sequelize = new Sequelize(
  'postgres://rdeboeor:apSXDd2s_Cu3frmThQCmWJIjvjCrg9Qs@isilo.db.elephantsql.com:5432/rdeboeor'
);

// Production
// const sequelize = new Sequelize(
//   process.env.DATABASE,
//   process.env.DATABASE_USER,
//   process.env.DATABASE_PASSWORD,
//   {
//     dialect: 'postgres',
//   },
// );

const models = {
  User: sequelize.import('./user'),
  Comment: sequelize.import('./comment')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
