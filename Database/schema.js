const { buildSchema } = require("graphql");
const schema = buildSchema(`
type Query {
"""  Company Query  """  
 getspecificcompany(name:String, email: String): Company
 deletespecificcompany(name:String, email: String): String  
 endcompanypayment(name:String,email:String): Company

 """ Employee query """
 getallemployees : [Employee]
 getallemployeesbymanager(managerid:Int): [Employee]
 getspecificemployee(empid:Int): Employee
 deleteemployee(empid:Int): String

 """ Shift query """
 getallshifts:[Shift]
 getspecificshift(shiftid:Int): Shift
 deleteshift(shiftid:Int): String

 """ Shift Pool query """
 getallinpool:[Shiftpool]
 getspecificpoolshift(shiftid:Int):Shiftpool
 removeshiftfrompool(shiftid:Int, empid:Int):String


 """ Meeting query """
 getallmeetings:[Meeting]
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

"""  --Employee Type--   """
type Employee{
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
    shiftid:Int,
    empid:Int,
    date:String,
    starttime:String,
    endtime:String,
}

"""  --Shift Pool Type--   """
type Shiftpool{   
    shiftid:Int,
    date:String,
    starttime:String,
    endtime:String,
}

"""  --Meetings Type--   """
type Meeting{   
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

    """Employee Mutations"""
    addemployee(managerid:Int, department:String, firstname: String, lastname: String, email:String, dob: String): Employee
    updateemployeeemail(empid: Int,email: String): Employee
    updateemployeedepartment(empid: Int, department:String): Employee 

    """Shift Mutations"""
    addshift(empid:Int, date:String, starttime:String, endtime:String): Shift
    updateshiftstarttime(shiftid:Int,starttime:String): Shift
    updateshiftendtime(shiftid:Int,endtime:String): Shift
    switchshift(shiftid:Int,empid:Int): Shift

    """Shift Pool Type"""
    addshifttopool(shiftid:Int): Shiftpool

    """Meeting Type"""
    postameeting(empid:Int,date:String,starttime:String,message:String): Meeting
    changemeetingtime(meetingid:Int, starttime:String):Meeting
    changemeetingdate(meetingid:Int, date:String):Meeting
}
`);
module.exports = { schema };
