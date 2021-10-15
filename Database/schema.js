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

 """ Payroll query """
 getallpayrolls:[Payroll]
 showspecificpayroll(prid:Int):Payroll
 showspecificemployeepayroll(empid:Int):[Payroll]

 """ Timeoff query """
 getalltimeoff:[Timeoff]
 showspecifictimeoff(toid:Int):Timeoff
 showspecificemployeetimeoff(empid:Int):[Timeoff]
 canceltimeoff(toid:Int):String

 """ Emergency query """
 getallemergencies:[Emergency]
 showspecificemergency(emergid:Int):Emergency
 showspecificemployeeemergency(empid:Int):[Emergency]

 """ Login query """
 getalllogins:[Login]
 showspecificemployeelogin(empid:Int):Login

 """ Signin query """
 getallsignins:[Signin]
 showspecificsignin(signid:Int): Signin
 showspecificemployeesignin(empid:Int):[Signin]

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

"""  --Payroll Type--   """
type Payroll{
    prid:Int,
    empid:Int,
    payrate:Float,
    paycycle:String,
    totalhrs:Float,
    amount:Float,
    date:String,
}

"""  --Timeoff Type--   """
type Timeoff{
    toid:Int,
    empid:Int,
    startdate:String,
    enddate:String,
    description:String,
    requestdate:String,
    approved:String,
}

"""  --Emergency Type--   """
type Emergency{ 
    emergid:Int,
    empid:Int,
    date:String,    
    description:String,    
}

"""  --Login Type--   """
type Login{       
    email:String,      
    password:String,    
}

"""  --Signin/out Type--   """
type Signin{  
    signid:Int,     
    empid:Int,
    starttime:String,
    endtime:String,
    date:String,  
}

""" --Mutations Types--"""
type Mutation{ 

    """company Mutations"""    
    addcompany(name: String, email: String, payoption: String): Company
    updatecompany(name: String, email: String, payoption: String): Company      

    """Employee Mutations"""
    addemployee(managerid:Int, department:String, firstname: String, lastname: String, email:String, dob: String): Employee
    updateemployee(managerid:Int,empid: Int,department:String,lastname:String, email: String): Employee   

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
    
    """Payroll Type"""
    addpayroll(empid:Int, payrate:Float, paycycle:String,totalhrs:Float): Payroll  
    
    """Timeoff Type"""    
    addtimeoff(empid:Int, startdate:String,enddate:String,description:String): Timeoff
    updateapproval(toid:Int):Timeoff

    """Emergency Type"""    
    addemergency(empid:Int,description:String): Emergency

    """Login Type"""
    addlogin(email:String, password:String):Login

    """Signin Type"""
    addsignin(empid:Int):Signin 
    updatesignintimes(signid:Int, starttime:String,endtime:String):Signin
    signout(signid:Int):Signin  
}
`);
module.exports = { schema };
