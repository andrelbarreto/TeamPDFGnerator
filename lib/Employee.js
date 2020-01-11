// The first class is an `Employee` parent class with the following properties and
// methods:

//   * name
//   * id
//   * title 
//   * getName()
//   * getId()
//   * getEmail()
//   * getRole() // Returns 'Employee'

//create employee parent class with three properties and four methods
class Employee {

    constructor(name, id, email, role) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = "Employee";
    }

    //use return and the property to get the value
    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return "Employee";
    }

    printInfo() {
        console.log(`Name: ${this.name}`);
        console.log(`Id: ${this.id}`);
        console.log(`Email: ${this.email}`);
        console.log('Role: ${this.role}');
    }
}

module.exports = Employee;