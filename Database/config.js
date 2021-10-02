const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  companies: process.env.COMPANYCOLLECTION,
  managers: process.env.MANAGERCOLLECTION,
  employees: process.env.EMPLOYEECOLLECTION,
  atlas: process.env.DBURL,
  appdb: process.env.DB,
  port: process.env.PORT,
  graphql: process.env.GRAPHQLURL,
};
