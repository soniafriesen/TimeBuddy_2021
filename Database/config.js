const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  companies: process.env.COMPANYCOLLECTION,
  managers: process.env.MANAGERCOLLECTION,
  employees: process.env.EMPLOYEECOLLECTION,
  shifts: process.env.SHIFTCOLLECTION,
  pool: process.env.SHIFTPOOLCOLLECTION,
  meetings: process.env.MEETINGCOLLECTION,
  atlas: process.env.DBURL,
  appdb: process.env.DB,
  port: process.env.PORT,
  graphql: process.env.GRAPHQLURL,
};
