const dbRtns = require("./dbroutines");
const {
  companies,
  managers,
  employees,
  shifts,
  pool,
  meetings,
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
  /*                               managers Function                                    */
  /**************************************************************************************/
  getallmanagers: async (args) => {
    let db = await dbRtns.getDBInstance();
    let manager = await dbRtns.findAll(db, managers, {
      compname: `${args.compname}`,
    });
    if (!manager) return `manager does not exist in company ${args.compname}`;
    else return manager;
  },
  getspecificmanager: async (args) => {
    let db = await dbRtns.getDBInstance();
    let manager = await dbRtns.findOne(db, managers, {
      empid: args.empid,
    });
    if (!manager) return `manager does not exist in company ${args.compname}`;
    else return manager;
  },
  addmanager: async (args) => {
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
      timeArr[2] +
      " " +
      timeArr[4];
    let startdate = timeinput;
    let min = Math.ceil(1001);
    let max = Math.floor(9999);
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    //check if there already is a empid
    let manager = await dbRtns.findAll(db, managers, {
      compname: `${args.compname}`,
    });
    let employee = await dbRtns.findAll(db, employees, {
      compname: `${args.compname}`,
    });
    if (manager || employee) {
      let doesExist = true;
      while (doesExist) {
        let yes = managers.includes(random);
        let yes2 = employee.includes(random);
        if ((doesExist = yes || yes2)) {
          random = Math.floor(Math.random() * (max - min + 1)) + min;
        }
      }
      //make sure all codes are unique
    }
    let newmanager = `{"compname":"${args.compname}","department":"${args.department}", "empid": ${random}, "firstname": "${args.firstname}", "lastname": "${args.lastname}", "email":"${args.email}", "dob": "${args.dob}", "startdate":"${startdate}"}`;
    newmanager = JSON.parse(newmanager);
    let found = await dbRtns.findOne(db, managers, {
      email: `${args.email}`,
    });
    if (!found) {
      let results = await dbRtns.addOne(db, managers, newmanager);
      return results.insertedCount === 1 ? newmanager : null;
    } else return `Manager ${args.firstname} already exists`;
  },
  updatemanageremail: async (args) => {
    let db = await dbRtns.getDBInstance();
    let manager = await dbRtns.findOne(db, managers, {
      empid: args.empid,
    });
    if (!manager) return `manager does not exist in collection`;
    let updateResults = await dbRtns.updateOne(
      db,
      managers,
      { _id: manager._id },
      {
        email: `${args.email}`,
      }
    );
    manager = await dbRtns.findOne(db, managers, {
      empid: args.empid,
    });
    return manager;
  },
  updatemanagerdepartment: async (args) => {
    let db = await dbRtns.getDBInstance();
    let manager = await dbRtns.findOne(db, managers, {
      empid: args.empid,
    });
    if (!manager) return `manager does not exist in collection`;
    let updateResults = await dbRtns.updateOne(
      db,
      managers,
      { _id: manager._id },
      {
        department: `${args.department}`,
      }
    );
    manager = await dbRtns.findOne(db, managers, {
      empid: args.empid,
    });
    return manager;
  },
  deletemanager: async (args) => {
    let db = await dbRtns.getDBInstance();
    let manager = await dbRtns.findOne(db, managers, {
      empid: args.empid,
    });
    if (!manager) return `manager does not exist in collection`;
    else {
      let deletedmanager = await dbRtns.deleteOne(db, managers, {
        _id: manager._id,
      });
      return `Deleted manager #${manager.empid}`;
    }
  },
  /**************************************************************************************/
  /*                                 employee Functions                                 */
  /**************************************************************************************/
  getallemployees: async (args) => {
    let db = await dbRtns.getDBInstance();
    let employee = await dbRtns.findAll(db, employees, {
      compname: `${args.compname}`,
    });
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
  getspecificemployee: async (args) => {
    let db = await dbRtns.getDBInstance();
    let employee = await dbRtns.findOne(db, employees, {
      empid: args.empid,
    });
    if (!employee)
      return `employee does not exist in collection ${args.compname}`;
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
      ("0" + usaTime.toLocaleString()[0]).slice(-2) +
      "-" +
      timeArr[2] +
      " " +
      timeArr[4];
    let startdate = timeinput;
    let min = Math.ceil(1001);
    let max = Math.floor(9999);
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    //check if there already is a empid
    let manager = await dbRtns.findAll(db, managers, {
      compname: `${args.compname}`,
    });
    let employee = await dbRtns.findAll(db, employees, {
      compname: `${args.compname}`,
    });
    if (manager || employee) {
      let doesExist = true;
      while (doesExist) {
        let yes = managers.includes(random);
        let yes2 = employee.includes(random);
        if ((doesExist = yes || yes2)) {
          random = Math.floor(Math.random() * (max - min + 1)) + min;
        }
      }
      //make sure all codes are unique
    }
    let newemployee = `{"compname":"${args.compname}","managerid":${args.managerid},"department":"${args.department}", "empid": ${random}, "firstname": "${args.firstname}", "lastname": "${args.lastname}", "email":"${args.email}", "dob": "${args.dob}", "startdate":"${startdate}"}`;
    newemployee = JSON.parse(newemployee);
    let found = await dbRtns.findOne(db, employees, {
      email: `${args.email}`,
    });
    if (!found) {
      let results = await dbRtns.addOne(db, employees, newemployee);
      return results.insertedCount === 1 ? newemployee : null;
    } else return `Employee ${found.empid} already exists`;
  },
  updateemployeeemail: async (args) => {
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
        email: `${args.email}`,
      }
    );
    employee = await dbRtns.findOne(db, employees, {
      empid: args.empid,
    });
    return employee;
  },
  updateemployeedepartment: async (args) => {
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
        department: `${args.department}`,
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
    let shift = await dbRtns.findAll(db, shifts, {
      compname: `${args.compname}`,
    });
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
    let newshift = `{"compname":"${args.compname}","shiftid":${random},"empid":${args.empid}, "date": "${args.date}", "starttime": "${args.starttime}", "endtime": "${args.endtime}"}`;
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
    let shiftpool = await dbRtns.findAll(db, pool, {
      compname: `${args.compname}`,
    });
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
    let newshift = `{"compname":"${args.compname}","shiftid":${args.shiftid}, "date": "${shift.date}", "starttime": "${shift.starttime}", "endtime": "${shift.endtime}"}`;
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
    let min = Math.ceil(1);
    let max = Math.floor(9999999);
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
    let newmeeting = `{"compname":"${args.compname}","meetingid":${random},"empid":${args.empid}, "date": "${args.date}", "starttime": "${args.starttime}", "message": "${args.message}"}`;
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
  getallmeetings: async (args) => {
    let db = await dbRtns.getDBInstance();
    let meeting = await dbRtns.findAll(db, meetings, {
      compname: `${args.compname}`,
    });
    if (!meeting)
      return `meeting does not exist in ${args.compname} meeting board`;
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
};

module.exports = { resolvers };
