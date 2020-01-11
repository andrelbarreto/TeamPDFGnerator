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

    constructor(name, id, email, _role) {
        this.name = name;
        this.id = id;
        this.email = email;
        this._role = "Employee";
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
        return this._role;
    }

    printInfo() {
        console.log(`Name: ${this.name}`);
        console.log(`Id: ${this.id}`);
        console.log(`Email: ${this.email}`);
        console.log(`Role: ${this._role}`);
    }
}

//exports it so it can be used externally
module.exports = Employee;