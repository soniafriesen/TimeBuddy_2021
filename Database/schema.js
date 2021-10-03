const { buildSchema } = require("graphql");
const schema = buildSchema(`
type Query {
"""  Company Query  """  
 getspecificcompany(name:String, email: String): Company
 deletespecificcompany(name:String, email: String): String  
 endcompanypayment(name:String,email:String): Company
 
 """ Manager query """
 getallmanagers(compname:String):[Manager]
 getspecificmanager(empid:Int): Manager
 deletemanager(empid:Int): String

 """ Employee query """
 getallemployees (compname:String): [Employee]
 getallemployeesbymanager(managerid:Int): [Employee]
 getspecificemployee(empid:Int): Employee
 deleteemployee(empid:Int): String

 """ Shift query """
 getallshifts(compname:String):[Shift]
 getspecificshift(shiftid:Int): Shift
 deleteshift(shiftid:Int): String

 """ Shift Pool query """
 getallinpool(compname:String):[Shiftpool]
 getspecificpoolshift(shiftid:Int):Shiftpool
 removeshiftfrompool(shiftid:Int, empid:Int):String


 """ Meeting query """
 getallmeetings(compname:String):[Meeting]
 showspecificmeeting(meetingid:Int):Meeting
 removemeeting(meetingid:Int):String

}

""" --Company Type--  """
type Company {
 name: String
 email: String
 payoption: String
 payamount: Float
 startdate: String 
 enddate:String
}

"""  --Manager Type--   """
type Manager{
compname:String,
department:String,
empid: Int,
firstname: String,
lastname:String,
email: String,
dob: String,
startdate: String,
}

"""  --Employee Type--   """
type Employee{
compname:String,
managerid:Int,
department:String,
empid: Int,
firstname: String,
lastname:String,
email: String,
dob: String,
startdate: String,
}

"""  --Shifts Type--   """
type Shift{
    compname:String,
    shiftid:Int,
    empid:Int,
    date:String,
    starttime:String,
    endtime:String,
}

"""  --Shift Pool Type--   """
type Shiftpool{
    compname:String,
    shiftid:Int,
    date:String,
    starttime:String,
    endtime:String,
}

"""  --Meetings Type--   """
type Meeting{
    compname:String,
    meetingid:Int,
    empid:Int,
    date:String,
    starttime:String,
    message:String,
}

""" --Mutations Types--"""
type Mutation{ 

    """company Mutations"""    
    addcompany(name: String, email: String, payoption: String): Company
    updatecompany(name: String, email: String, payoption: String): Company 

    """Manager Mutations"""
    addmanager(compname:String, department:String, firstname: String, lastname: String, email:String, dob: String): Manager
    updatemanageremail(empid: Int, email:String): Manager
    updatemanagerdepartment(empid: Int, department:String): Manager      

    """Employee Mutations"""
    addemployee(compname:String, managerid:Int, department:String, firstname: String, lastname: String, email:String, dob: String): Employee
    updateemployeeemail(empid: Int,email: String): Employee
    updateemployeedepartment(empid: Int, department:String): Employee 

    """Shift Mutations"""
    addshift(compname:String,empid:Int, date:String, starttime:String, endtime:String): Shift
    updateshiftstarttime(shiftid:Int,starttime:String): Shift
    updateshiftendtime(shiftid:Int,endtime:String): Shift
    switchshift(shiftid:Int,empid:Int): Shift

    """Shift Pool Type"""
    addshifttopool(compname:String,shiftid:Int): Shiftpool

    """Meeting Type"""
    postameeting(compname:String, empid:Int,date:String,starttime:String,message:String): Meeting
    changemeetingtime(meetingid:Int, starttime:String):Meeting
    changemeetingdate(meetingid:Int, date:String):Meeting
}
`);
module.exports = { schema };
