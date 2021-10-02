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
    addemployee(compname:String, managerid:Int, department:String, firstname: String, lastname: String, email:String, dob: String): String
    updateemployeeemail(empid: Int,email: String): Employee
    updateemployeedepartment(empid: Int, department:String): Employee 

}
`);
module.exports = { schema };
