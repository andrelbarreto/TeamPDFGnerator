// The other three classes will extend `Employee`. 
// In addition to `Employee`'s properties and methods, `Manager` will also have:

//   * officeNumber using getOfficeNumber() for testing 'Manager'

//   * getRole() // Overridden to return 'Manager'

//require class_employee file for class Employee to be extended
const Employee = require("./Employee");

//create Manager class that extends Employee with one additional property (officeNumber) and two methods (getOfficeNumber and update getRole)
class Manager extends Employee {

    //add officeNumber parameter, which will refer to the office Employee's manage
    //since the Manager constructor should also have the Employee's properties and methods, include those as parameters in addition to school
    constructor(name, id, email, officeNumber) {

        //add super as a requirement for the extended class, which contains the Employee parameters
        super(name, id, email);

        //create this.officeNumber property, which is specific to the Manager class
        this.officeNumber = officeNumber;
    }

    //set two methods, one of which changes the getRole() from the Employee class 
    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return "Manager";
    }

}

//export Manager so it can be used externally
module.exports = Manager;