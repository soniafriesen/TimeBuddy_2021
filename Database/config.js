const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  companies: process.env.COMPANYCOLLECTION,
  employees: process.env.EMPLOYEECOLLECTION,
  shifts: process.env.SHIFTCOLLECTION,
  pool: process.env.SHIFTPOOLCOLLECTION,
  meetings: process.env.MEETINGCOLLECTION,
  payrolls: process.env.PAYROLLCOLLECTION,
  timesoff:process.env.TIMEOFFCOLLECTION,
  emergencies:process.env.EMERGENCYCOLLECTION,
  signins:process.env.SIGNINCOLLECTION,
  logins:process.env.LOGINCOLLECTION,
  atlas: process.env.DBURL,
  appdb: process.env.DB,
  port: process.env.PORT,
  graphql: process.env.GRAPHQLURL,
};
