const dbRtns = require("./dbroutines");
const {
  companies,
  employees,
  shifts,
  pool,
  meetings,
  payrolls,
  timesoff,
  emergencies,
  signins,
  logins,
} = require("./config");
const resolvers = {
  /**************************************************************************************/
  /*                                company Functions                                   */
  /**************************************************************************************/
  /* company functionality is for our buisness only, it is the way we can charge then for using our service*/
  getspecificcompany: async (args) => {
    let db = await dbRtns.getDBInstance();
    let company = await dbRtns.findOne(db, companies, {
      name: `${args.name}`,
      email: `${args.email}`,
    });
    if (!company) return `company does not exist in collection`;
    else return company;
  },
  addcompany: async (args) => {
    let pay;
    let db = await dbRtns.getDBInstance();
    if (args.payoption === "monthly") pay = 25.99; //temp amount
    pay = 325.0;
    usaTime = new Date(usaTime);
    var timeStr = new Date() + 3600000 * -5.0;
    var timeArr = timeStr.split(" ");
    var timeinput =
      timeArr[3] +
      "-" +
      usaTime.toLocaleString().slice(5, 7) +
      "-" +
      timeArr[2];
    let startdate = timeinput;
    let company = `{"name": "${args.name}", "email": "${args.email}", "payoption": "${args.payoption}", "payamount": ${pay}, "startdate":"${startdate}","enddate":"still active"}`;
    company = JSON.parse(company);
    let found = await dbRtns.findOne(db, companies, {
      name: `${args.name}`,
      email: `${args.email}`,
    });
    if (!found) {
      let results = await dbRtns.addOne(db, companies, company);
      return results.insertedCount === 1 ? company : null;
    } else return `company ${args.name} already exists`;
  },
  updatecompany: async (args) => {
    let db = await dbRtns.getDBInstance();
    let company = await dbRtns.findOne(db, companies, {
      name: `${args.name}`,
    });
    if (!company) return `company does not exist in collection`;
    let updateResults;
    let pay;
    if (company.email === args.email && company.payoption != args.payoption) {
      if (args.payoption === "monthly") pay = 25.99;
      //checking if there was a change in
      else pay = 325.0;
      updateResults = await dbRtns.updateOne(
        db,
        companies,
        { _id: company._id },
        {
          payoption: `${args.payoption}`,
          payamount: pay,
        }
      );
    } else if (
      company.email != args.email &&
      company.payoption != args.payoption
    ) {
      if (args.payoption === "monthly") pay = 25.99;
      //checking if there was a change in
      else pay = 325.0;
      updateResults = await dbRtns.updateOne(
        db,
        companies,
        { _id: company._id },
        {
          email: `${args.email}`,
          payoption: `${args.payoption}`,
          payamount: pay,
        }
      );
    } else {
      //its the email change only
      updateResults = await dbRtns.updateOne(
        db,
        companies,
        { _id: company._id },
        {
          email: `${args.email}`,
        }
      );
    }
    company = await dbRtns.findOne(db, companies, {
      name: `${args.name}`,
      email: `${args.email}`,
    });
    return company;
  },
  endcompanypayment: async (args) => {
    let db = await dbRtns.getDBInstance();
    let company = await dbRtns.findOne(db, companies, {
      name: `${args.name}`,
    });
    if (!company) return `company does not exist in collection`;
    var usaTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    usaTime = new Date(usaTime);
    var timeStr = new Date() + 3600000 * -5.0;
    var timeArr = timeStr.split(" ");
    var timeinput =
      timeArr[3] +
      "-" +
      ("0" + usaTime.toLocaleString()[0]).slice(-2) +
      "-" +
      timeArr[2] +
      " " +
      timeArr[4];
    let enddate = timeinput;
    let updateResults = await dbRtns.updateOne(
      db,
      companies,
      { _id: company._id },
      {
        enddate: `${enddate}`,
      }
    );
    company = await dbRtns.findOne(db, companies, {
      name: `${args.name}`,
      email: `${args.email}`,
    });
    return company;
  },
  deletespecificcompany: async (args) => {
    let db = await dbRtns.getDBInstance();
    let company = await dbRtns.findOne(db, companies, {
      name: `${args.name}`,
      email: `${args.email}`,
    });
    if (!company) return `company does not exist in collection`;
    else {
      let deletedcompany = await dbRtns.deleteOne(db, companies, {
        _id: company._id,
      });
      return `Deleted company ${company.name}`;
    }
  },
  /**************************************************************************************/
  /*                                 employee Functions                                 */
  /**************************************************************************************/
  getallemployees: async () => {
    let db = await dbRtns.getDBInstance();
    let employee = await dbRtns.findAll(db, employees);
    if (!employee) return `employee does not exist in company ${args.compname}`;
    else return employee;
  },
  getallemployeesbymanager: async (args) => {
    let db = await dbRtns.getDBInstance();
    let employee = await dbRtns.findOne(db, employees, {
      managerid: `${args.managerid}`,
    });
    if (!employee)
      return `employee does not exist for manager ${args.managerid}`;
    else return employee;
  },
  getemployeebyID: async (args) => {
    let db = await dbRtns.getDBInstance();
    let employee = await dbRtns.findOne(db, employees, {
      empid: args.empid,
    });
    if (!employee) return `employee does not exist in collection`;
    else return employee;
  },
  getemployeebyemail: async (args) => {
    let db = await dbRtns.getDBInstance();
    let employee = await dbRtns.findOne(db, employees, {
      email: args.email,
    });
    if (!employee) return `employee does not exist in collection`;
    else return employee;
  },
  addemployee: async (args) => {
    let db = await dbRtns.getDBInstance();
    var usaTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    usaTime = new Date(usaTime);
    var timeStr = new Date() + 3600000 * -5.0;
    var timeArr = timeStr.split(" ");
    var timeinput =
      timeArr[3] +
      "-" +
      usaTime.toLocaleString().slice(5, 7) +
      "-" +
      timeArr[2];
    let startdate = timeinput;
    let min = Math.ceil(1001);
    let max = Math.floor(9999);
    let random = Math.floor(Math.random() * (max - min + 1)) + min;

    let employee = await dbRtns.findAll(db, employees, {
      compname: `${args.compname}`,
    });
    if (employee) {
      let doesExist = true;
      while (doesExist) {
        let yes2 = employee.includes(random);
        if ((doesExist = yes2)) {
          random = Math.floor(Math.random() * (max - min + 1)) + min;
        }
      }
      //make sure all codes are unique
    }
    let newemployee = `{"managerid":${args.managerid},"department":"${args.department}", "empid": ${random}, "firstname": "${args.firstname}", "lastname": "${args.lastname}", "email":"${args.email}", "dob": "${args.dob}", "startdate":"${startdate}"}`;
    newemployee = JSON.parse(newemployee);
    let found = await dbRtns.findOne(db, employees, {
      email: `${args.email}`,
    });
    if (!found) {
      let results = await dbRtns.addOne(db, employees, newemployee);
      return results.insertedCount === 1 ? newemployee : newemployee;
    } else return `Employee ${found.empid} already exists`;
  },
  updateemployee: async (args) => {
    let db = await dbRtns.getDBInstance();
    let employee = await dbRtns.findOne(db, employees, {
      empid: args.empid,
    });
    if (!employee) return `employee does not exist in collection`;
    let updateResults = await dbRtns.updateOne(
      db,
      employees,
      { _id: employee._id },
      {
        managerid: args.managerid,
        department: `${args.department}`,
        lastname: `${args.lastname}`,
        email: `${args.email}`,
      }
    );
    employee = await dbRtns.findOne(db, employees, {
      empid: args.empid,
    });
    return employee;
  },
  deleteemployee: async (args) => {
    let db = await dbRtns.getDBInstance();
    let employee = await dbRtns.findOne(db, employees, {
      empid: args.empid,
    });
    if (!employee) return `employee does not exist in collection`;
    else {
      let deletedmanager = await dbRtns.deleteOne(db, employees, {
        _id: employee._id,
      });
      return `Deleted employee #${employee.empid}`;
    }
  },
  /**************************************************************************************/
  /*                                  shift Functions                                   */
  /**************************************************************************************/
  getallshifts: async (args) => {
    let db = await dbRtns.getDBInstance();
    let shift = await dbRtns.findAll(db, shifts);
    if (!shift) return `shift does not exist in company ${args.compname}`;
    else return shift;
  },
  getspecificshift: async (args) => {
    let db = await dbRtns.getDBInstance();
    let shift = await dbRtns.findOne(db, shifts, {
      shiftid: args.shiftid,
    });
    if (!shift) return `shift does not exist in collection`;
    else return shift;
  },
  addshift: async (args) => {
    let db = await dbRtns.getDBInstance();
    let min = Math.ceil(1);
    let max = Math.floor(9999999);
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    //check if there already is a empid
    //check if there already is a shiftid
    let shift = await dbRtns.findAll(db, shifts, {
      compname: `${args.compname}`,
    });

    if (shift) {
      let doesExist = true;
      while (doesExist) {
        let yes = shift.includes(random);
        if ((doesExist = yes)) {
          random = Math.floor(Math.random() * (max - min + 1)) + min;
        }
      }
      //make sure all codes are unique
    }
    let newshift = `{"shiftid":${random},"empid":${args.empid}, "date": "${args.date}", "starttime": "${args.starttime}", "endtime": "${args.endtime}"}`;
    newshift = JSON.parse(newshift);
    let found = await dbRtns.findOne(db, shifts, {
      shiftid: random,
      empid: args.empid,
    });
    if (!found) {
      let results = await dbRtns.addOne(db, shifts, newshift);
      return results.insertedCount === 1 ? newshift : null;
    } else
      return `Shift ${found.shiftid} already assigned to employee ${found.empid}`;
  },
  updateshiftstarttime: async (args) => {
    let db = await dbRtns.getDBInstance();
    let shift = await dbRtns.findOne(db, shifts, {
      shiftid: args.shiftid,
    });
    if (!shift) return `shift does not exist in collection`;
    let updateResults = await dbRtns.updateOne(
      db,
      shifts,
      { _id: shift._id },
      {
        starttime: `${args.starttime}`,
      }
    );
    shift = await dbRtns.findOne(db, shifts, {
      shiftid: args.shiftid,
    });
    return shift;
  },
  updateshiftendtime: async (args) => {
    let db = await dbRtns.getDBInstance();
    let shift = await dbRtns.findOne(db, shifts, {
      shiftid: args.shiftid,
    });
    if (!shift) return `shift does not exist in collection`;
    let updateResults = await dbRtns.updateOne(
      db,
      shifts,
      { _id: shift._id },
      {
        endtime: `${args.endtime}`,
      }
    );
    shift = await dbRtns.findOne(db, shifts, {
      shiftid: args.shiftid,
    });
    return shift;
  },
  switchshift: async (args) => {
    let db = await dbRtns.getDBInstance();
    let shift = await dbRtns.findOne(db, shifts, {
      shiftid: args.shiftid,
    });
    if (!shift) return `shift does not exist in collection`;
    let updateResults = await dbRtns.updateOne(
      db,
      shifts,
      { _id: shift._id },
      {
        empid: args.empid,
      }
    );
    shift = await dbRtns.findOne(db, shifts, {
      shiftid: args.shiftid,
    });
    return shift;
  },
  deleteshift: async (args) => {
    let db = await dbRtns.getDBInstance();
    let shift = await dbRtns.findOne(db, shifts, {
      shiftid: args.shiftid,
    });
    if (!shift) return `shift does not exist in collection`;
    else {
      let deletedmanager = await dbRtns.deleteOne(db, shifts, {
        _id: shift._id,
      });
      return `Deleted shift #${shift.shiftid}`;
    }
  },
  /**************************************************************************************/
  /*                              shift pool Functions                                  */
  /**************************************************************************************/
  getallinpool: async (args) => {
    let db = await dbRtns.getDBInstance();
    let shiftpool = await dbRtns.findAll(db, pool);
    if (!shiftpool)
      return `shift does not exist in ${args.compname} shift pool`;
    else return shiftpool;
  },
  getspecificpoolshift: async (args) => {
    let db = await dbRtns.getDBInstance();
    let shiftpool = await dbRtns.findOne(db, pool, {
      shiftid: args.shiftid,
    });
    if (!shiftpool) return `shift does not exist in collection`;
    else return shiftpool;
  },
  addshifttopool: async (args) => {
    let db = await dbRtns.getDBInstance();
    let shift = await dbRtns.findOne(db, shifts, { shiftid: args.shiftid });
    let newshift = `{"shiftid":${args.shiftid}, "date": "${shift.date}", "starttime": "${shift.starttime}", "endtime": "${shift.endtime}"}`;
    newshift = JSON.parse(newshift);
    //remove shift from the shift colleciton to indicate it is not a scheduled shift
    let deleteshift = await dbRtns.deleteOne(db, shifts, {
      shiftid: shift.shiftid,
    });
    let found = await dbRtns.findOne(db, pool, {
      shiftid: shift.shiftid,
    });
    if (!found) {
      let results = await dbRtns.addOne(db, pool, newshift);
      return results.insertedCount === 1 ? newshift : null;
    } else return `Shift ${found.shiftid} already in the pool`;
  },
  removeshiftfrompool: async (args) => {
    let db = await dbRtns.getDBInstance();
    let shiftpool = await dbRtns.findOne(db, pool, {
      shiftid: args.shiftid,
    });
    if (!shiftpool) return `shift does not exist in pool`;
    else {
      //add the new assigned empoyee to shift
      //give it a new shiftid just incase another shift picked it up
      let min = Math.ceil(1);
      let max = Math.floor(9999999);
      let random = Math.floor(Math.random() * (max - min + 1)) + min;
      let shift = await dbRtns.findAll(db, shifts, {
        compname: `${shiftpool.compname}`,
      });
      if (shift) {
        let doesExist = true;
        while (doesExist) {
          let yes = shift.includes(random);
          if ((doesExist = yes)) {
            random = Math.floor(Math.random() * (max - min + 1)) + min;
          }
        }
        //make sure all codes are unique
        let newshift = `{"compname":"${shiftpool.compname}","shiftid":${random},"empid":${args.empid}, "date": "${shiftpool.date}", "starttime": "${shiftpool.starttime}", "endtime": "${shiftpool.endtime}"}`;
        newshift = JSON.parse(newshift);
        let found = await dbRtns.findOne(db, shifts, {
          shiftid: random,
          empid: args.empid,
        });
        if (!found) {
          let results = await dbRtns.addOne(db, shifts, newshift);
          if (results.insertedCount === 1 ? newshift : null);

          let deletedmanager = await dbRtns.deleteOne(db, pool, {
            _id: shiftpool._id,
          });
          return `Removed shift  #${shiftpool.shiftid} from pool`;
        }
      }
    }
  },
  /**************************************************************************************/
  /*                              Meetings Functions                                    */
  /**************************************************************************************/
  postameeting: async (args) => {
    let db = await dbRtns.getDBInstance();
    let min = Math.ceil(1001);
    let max = Math.floor(9999);
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    let meeting = await dbRtns.findAll(db, meetings, {
      compname: `${args.compname}`,
    });

    if (meeting) {
      let doesExist = true;
      while (doesExist) {
        let yes = meeting.includes(random);
        if ((doesExist = yes)) {
          random = Math.floor(Math.random() * (max - min + 1)) + min;
        }
      }
      //make sure all codes are unique
    }
    let newmeeting = `{"meetingid":${random},"empid":${args.empid}, "date": "${args.date}", "starttime": "${args.starttime}", "message": "${args.message}"}`;
    newmeeting = JSON.parse(newmeeting);
    let found = await dbRtns.findOne(db, meetings, {
      meetingid: random,
      empid: args.empid,
    });
    if (!found) {
      let results = await dbRtns.addOne(db, meetings, newmeeting);
      return results.insertedCount === 1 ? newmeeting : null;
    } else return `meeting ${found.meetingid} already on message board`;
  },
  getallmeetings: async () => {
    let db = await dbRtns.getDBInstance();
    let meeting = await dbRtns.findAll(db, meetings);
    if (!meeting) return `meeting does not exist in meeting board`;
    else return meeting;
  },
  showspecificmeeting: async (args) => {
    let db = await dbRtns.getDBInstance();
    let meeting = await dbRtns.findOne(db, meetings, {
      meetingid: args.meetingid,
    });
    if (!meeting) return `meeting does not exist in meeting board`;
    else return meeting;
  },
  changemeetingtime: async (args) => {
    let db = await dbRtns.getDBInstance();
    let meeting = await dbRtns.findOne(db, meetings, {
      meetingid: args.meetingid,
    });
    if (!meeting) return `meeting does not exist in collection`;
    let updateResults = await dbRtns.updateOne(
      db,
      meetings,
      { _id: meeting._id },
      {
        starttime: `${args.starttime}`,
      }
    );
    meeting = await dbRtns.findOne(db, meetings, {
      meetingid: args.meetingid,
    });
    return meeting;
  },
  changemeetingdate: async (args) => {
    let db = await dbRtns.getDBInstance();
    let meeting = await dbRtns.findOne(db, meetings, {
      meetingid: args.meetingid,
    });
    if (!meeting) return `meeting does not exist in collection`;
    let updateResults = await dbRtns.updateOne(
      db,
      meetings,
      { _id: meeting._id },
      {
        date: `${args.date}`,
      }
    );
    meeting = await dbRtns.findOne(db, meetings, {
      meetingid: args.meetingid,
    });
    return meeting;
  },
  removemeeting: async (args) => {
    let db = await dbRtns.getDBInstance();
    let meeting = await dbRtns.findOne(db, meetings, {
      meetingid: args.meetingid,
    });
    if (!meeting) return `meeting does not exist in collection`;
    else {
      let deletedmanager = await dbRtns.deleteOne(db, meetings, {
        _id: meeting._id,
      });
      return `Deleted meeting post #${meeting.meetingid}`;
    }
  },

  /**************************************************************************************/
  /*                               Payroll Functions                                    */
  /**************************************************************************************/
  addpayroll: async (args) => {
    let db = await dbRtns.getDBInstance();
    let payamount = args.totalhrs * args.payrate;
    usaTime = new Date(usaTime);
    var timeStr = new Date() + 3600000 * -5.0;
    var timeArr = timeStr.split(" ");
    var timeinput =
      timeArr[3] +
      "-" +
      usaTime.toLocaleString().slice(5, 7) +
      "-" +
      timeArr[2];
    let startdate = timeinput;
    let min = Math.ceil(1001);
    let max = Math.floor(9999);
    let random = Math.floor(Math.random() * (max - min + 1)) + min;

    let payroll = await dbRtns.findAll(db, timesoff, {});
    if (payroll) {
      let doesExist = true;
      while (doesExist) {
        let yes2 = timepayrolloff.includes(random);
        if ((doesExist = yes2)) {
          random = Math.floor(Math.random() * (max - min + 1)) + min;
        }
      }
    }

    let newpayroll = `{"prid": ${random},"empid":${args.empid}, "payrate": ${args.payrate}, "paycycle": "${args.paycycle}", "totalhrs": ${args.totalhrs}, "amount": ${payamount},"date":"${startdate}"}`;
    newpayroll = JSON.parse(newpayroll);
    let found = await dbRtns.findOne(db, payrolls, {
      prid: random,
      empid: args.empid,
    });
    if (!found) {
      let results = await dbRtns.addOne(db, payrolls, newpayroll);
      return results.insertedCount === 1 ? newpayroll : newpayroll;
    } else return `payroll already on registered`;
  },
  getallpayrolls: async () => {
    let db = await dbRtns.getDBInstance();
    let payroll = await dbRtns.findAll(db, payrolls);
    if (!payroll) return `no payrolls registered`;
    else return payroll;
  },
  showspecificpayroll: async (args) => {
    let db = await dbRtns.getDBInstance();
    let payroll = await dbRtns.findOne(db, payrolls, {
      prid: args.prid,
    });
    if (!payroll) return `payroll does not exist payroll registry`;
    else return payroll;
  },
  showspecificemployeepayroll: async (args) => {
    let db = await dbRtns.getDBInstance();
    let payroll = await dbRtns.findAll(db, payrolls, {
      empid: args.empid,
    });
    if (!payroll) return `payroll does not exist payroll registry`;
    else return payroll;
  },

  /**************************************************************************************/
  /*                               Timeoff Functions                                    */
  /**************************************************************************************/
  addtimeoff: async (args) => {
    let db = await dbRtns.getDBInstance();
    var usaTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    usaTime = new Date(usaTime);
    var timeStr = new Date() + 3600000 * -5.0;
    var timeArr = timeStr.split(" ");
    var timeinput =
      timeArr[3] +
      "-" +
      usaTime.toLocaleString().slice(5, 7) +
      "-" +
      timeArr[2];
    let startdate = timeinput;
    let approved = "No";

    let min = Math.ceil(1001);
    let max = Math.floor(9999);
    let random = Math.floor(Math.random() * (max - min + 1)) + min;

    let timeoff = await dbRtns.findAll(db, timesoff, {});
    if (timeoff) {
      let doesExist = true;
      while (doesExist) {
        let yes2 = timeoff.includes(random);
        if ((doesExist = yes2)) {
          random = Math.floor(Math.random() * (max - min + 1)) + min;
        }
      }
    }
    //make sure all codes are unique
    let newtimeoff = `{"toid": ${random},"empid":${args.empid}, "startdate": "${args.startdate}", "enddate": "${args.enddate}", "description": "${args.description}", "requestdate":"${startdate}", "approved": "${approved}"}`;
    newtimeoff = JSON.parse(newtimeoff);
    let found = await dbRtns.findOne(db, timesoff, {
      toid: random,
      empid: args.empid,
    });
    if (!found) {
      let results = await dbRtns.addOne(db, timesoff, newtimeoff);
      return results.insertedCount === 1 ? newtimeoff : newtimeoff;
    } else return `timeoff already requested`;
  },
  getalltimeoff: async () => {
    let db = await dbRtns.getDBInstance();
    let timeoff = await dbRtns.findAll(db, timesoff);
    if (!timeoff) return `no time off requested`;
    else return timeoff;
  },
  showspecifictimeoff: async (args) => {
    let db = await dbRtns.getDBInstance();
    let timeoff = await dbRtns.findOne(db, timesoff, {
      toid: args.toid,
    });
    if (!timeoff) return `time off is not registered`;
    else return timeoff;
  },
  showspecificemployeetimeoff: async (args) => {
    let db = await dbRtns.getDBInstance();
    let timeoff = await dbRtns.findAll(db, timesoff, {
      empid: args.empid,
    });
    if (!timeoff) return `time off request does not exist`;
    else return timeoff;
  },
  updateapproval: async (args) => {
    let db = await dbRtns.getDBInstance();
    let timeoff = await dbRtns.findOne(db, timesoff, {
      toid: args.toid,
    });
    if (!timeoff) return `time off request does not exist`;
    let updateResults = await dbRtns.updateOne(
      db,
      timesoff,
      { _id: timeoff._id },
      {
        approved: "Yes",
      }
    );
    timeoff = await dbRtns.findOne(db, timesoff, {
      toid: args.toid,
    });
    return timeoff;
  },
  canceltimeoff: async (args) => {
    let db = await dbRtns.getDBInstance();
    let timeoff = await dbRtns.findOne(db, timesoff, {
      toid: args.toid,
    });
    if (!timeoff) return `time off request does not exist`;
    else {
      let deletedmanager = await dbRtns.deleteOne(db, timesoff, {
        _id: timeoff._id,
      });
      return `Deleted time off request #${timeoff.toid}`;
    }
  },

  /**************************************************************************************/
  /*                             Emergencies Functions                                  */
  /**************************************************************************************/
  addemergency: async (args) => {
    let db = await dbRtns.getDBInstance();
    var usaTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    usaTime = new Date(usaTime);
    var timeStr = new Date() + 3600000 * -5.0;
    var timeArr = timeStr.split(" ");
    var timeinput =
      timeArr[3] +
      "-" +
      ("0" + usaTime.toLocaleString()[0]).slice(-2) +
      "-" +
      timeArr[2];
    let startdate = timeinput;
    let min = Math.ceil(1001);
    let max = Math.floor(9999);
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    let emergency = await dbRtns.findAll(db, emergencies, {});
    if (emergency) {
      let doesExist = true;
      while (doesExist) {
        let yes2 = emergency.includes(random);
        if ((doesExist = yes2)) {
          random = Math.floor(Math.random() * (max - min + 1)) + min;
        }
      }
    }
    let newemergency = `{"emergid": ${random},"empid":${args.empid},"date":"${startdate}",  "description": "${args.description}"}`;
    newemergency = JSON.parse(newemergency);
    let found = await dbRtns.findOne(db, emergencies, {
      emergid: random,
      empid: args.empid,
    });
    if (!found) {
      let results = await dbRtns.addOne(db, emergencies, newemergency);
      return results.insertedCount === 1 ? newemergency : newemergency;
    } else return `emergency already submitted`;
  },
  getallemergencies: async () => {
    let db = await dbRtns.getDBInstance();
    let emergency = await dbRtns.findAll(db, emergencies);
    if (!emergency) return `emergency not submited`;
    else return emergency;
  },
  showspecificemergency: async (args) => {
    let db = await dbRtns.getDBInstance();
    let emergency = await dbRtns.findOne(db, emergencies, {
      emergid: args.emergid,
    });
    if (!emergency) return `emergency not submited`;
    else return emergency;
  },
  showspecificemployeeemergency: async (args) => {
    let db = await dbRtns.getDBInstance();
    let emergency = await dbRtns.findAll(db, emergencies, {
      empid: args.empid,
    });
    if (!emergency) return `emergency not submited`;
    else return emergency;
  },

  /**************************************************************************************/
  /*                                Login Functions                                     */
  /**************************************************************************************/
  addlogin: async (args) => {
    let db = await dbRtns.getDBInstance();
    var usaTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    usaTime = new Date(usaTime);
    var timeStr = new Date() + 3600000 * -5.0;
    var timeArr = timeStr.split(" ");
    var timeinput =
      timeArr[3] +
      "-" +
      usaTime.toLocaleString().slice(5, 7) +
      "-" +
      timeArr[2];
    let startdate = timeinput;
    let login = `{"email": "${args.email}","password":"${args.password}","datecreated":"${startdate}"}`;
    login = JSON.parse(login);
    let found = await dbRtns.findOne(db, logins, {
      email: args.email,
      password: args.password,
    });
    if (!found) {
      let results = await dbRtns.addOne(db, logins, login);
      return results.insertedCount === 1 ? login : login;
    } else return `login already exists`;
  },
  getalllogins: async () => {
    let db = await dbRtns.getDBInstance();
    let login = await dbRtns.findAll(db, logins);
    if (!login) return `signin does not exist`;
    else return login;
  },
  showspecificemployeelogin: async (args) => {
    let db = await dbRtns.getDBInstance();
    let login = await dbRtns.findOne(db, logins, {
      email: args.email,
    });
    if (!login) return `login does not exists`;
    else return login;
  },
  changepassword: async (args) => {
    let db = await dbRtns.getDBInstance();
    let login = await dbRtns.findOne(db, logins, {
      email: args.email,
    });
    if (!login) return `login does not exist`;
    let updateResults = await dbRtns.updateOne(
      db,
      logins,
      { _id: login._id },
      {
        password: `${args.password}`,
      }
    );
    login = await dbRtns.findOne(db, logins, {
      email: args.email,
    });
    return login;
  },
  removelogin: async (args) => {
    let db = await dbRtns.getDBInstance();
    let login = await dbRtns.findOne(db, logins, {
      email: args.email,
    });
    if (!login) return `login does not exist`;
    else {
      let deletedlogin = await dbRtns.deleteOne(db, logins, {
        _id: login._id,
      });
      return `Removed Login for ${login.email}`;
    }
  },

  /**************************************************************************************/
  /*                               Signin Functions                                     */
  /**************************************************************************************/
  addsignin: async (args) => {
    let db = await dbRtns.getDBInstance();
    let signin = await dbRtns.findAll(db, signins);
    let id = signin.length + 1;
    var usaTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    usaTime = new Date(usaTime);
    var timeStr = new Date() + 3600000 * -5.0;
    var timeArr = timeStr.split(" ");
    var timeinput =
      timeArr[3] +
      "-" +
      ("0" + usaTime.toLocaleString()[0]).slice(-2) +
      "-" +
      timeArr[2];
    let date = timeinput;
    let timestart = timeArr[4];
    let newsignin = `{"signid": ${id},"empid":${args.empid},"starttime":"${timestart}", "endtime":" ","date":"${date}"}`;
    newsignin = JSON.parse(newsignin);
    let found = await dbRtns.findOne(db, signins, {
      signin: id,
      empid: args.empid,
    });
    if (!found) {
      let results = await dbRtns.addOne(db, signins, newsignin);
      return results.insertedCount === 1 ? newsignin : newsignin;
    } else return `Employee already signedin`;
  },
  getallsignins: async () => {
    let db = await dbRtns.getDBInstance();
    let signin = await dbRtns.findAll(db, signins);
    if (!signin) return `signin does not exist`;
    else return signin;
  },
  showspecificsignin: async (args) => {
    let db = await dbRtns.getDBInstance();
    let signin = await dbRtns.findOne(db, signins, {
      signid: args.signid,
    });
    if (!signin) return `signin does not exists`;
    else return signin;
  },
  showspecificemployeesignin: async (args) => {
    let db = await dbRtns.getDBInstance();
    let signin = await dbRtns.findAll(db, signins, {
      empid: args.empid,
    });
    if (!signin) return `signin does not exists`;
    else return signin;
  },
  updatesignintimes: async (args) => {
    let db = await dbRtns.getDBInstance();
    let signin = await dbRtns.findOne(db, signins, {
      signid: args.signid,
    });
    if (!signin) return `signin does not exist`;
    let updateResults = await dbRtns.updateOne(
      db,
      signins,
      { _id: signin._id },
      {
        starttime: `${args.starttime}`,
        endtime: `${args.endtime}`,
      }
    );
    signin = await dbRtns.findOne(db, signins, {
      signid: args.signid,
    });
    return signin;
  },
  signout: async (args) => {
    let db = await dbRtns.getDBInstance();
    var usaTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    usaTime = new Date(usaTime);
    var timeStr = new Date() + 3600000 * -5.0;
    var timeArr = timeStr.split(" ");
    let endtime = timeArr[4];
    let signin = await dbRtns.findOne(db, signins, {
      signid: args.signid,
    });
    if (!signin) return `signin does not exist`;
    let updateResults = await dbRtns.updateOne(
      db,
      signins,
      { _id: signin._id },
      {
        endtime: `${endtime}`,
      }
    );
    signin = await dbRtns.findOne(db, signins, {
      signid: args.signid,
    });
    return signin;
  },
};

module.exports = { resolvers };
