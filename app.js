//app.js runs the application on node js
//the folder lib contains classes for each employee type
//template contains the html templates for each type
//output is where the rendered file(s) are saved

// ### User input
// The project must prompt the user to build an engineering team. An engineering
// team consists of a manager, and any number of engineers and interns.

// The project must generate a `team.html` page in the `output` directory, that displays a nicely formatted team roster. Each team member should display the following in no particular order:
//   * Name
//   * Role
//   * ID
//   * Role-specific property (School, link to GitHub profile, or office number)


const inquirer = require("inquirer");
const fs = require("fs");
const employee = require("./lib/Employee");
const manager = require("./lib/Manager");
const engineer = require("./lib/Engineer");
const intern = require("./lib/Intern");

//array of data that will be input into arrayHTML
let arrayAnswers = [];

//array of html that will be created from inputs and collect inputs
let arrayHTML = [];

//array of html that will be written to the final output team_index.html
let arrayHTMLFinal = [];

let arrayHTMLFinalTemplate = [];


function initiate() {

    console.log(`Let's build your team. Please follow the prompts and answer questions below:`);

    inquirer.prompt([
      {
        type: "list",
        name: "_role",
        message: "Select this team member's role:",
        choices: ["Manager", "Engineer", "Intern"]
      },
      {
        type: "input",
        name: "name",
        message: "Enter this team member's name:"
      },
      {
        type: "input",
        name: "id",
        message: "Enter id:"
      },
      {
        type: "input",
        name: "email",
        message: "Enter email address of this team member following format (name@domain.com):"
      },
      {
        type: "input",
        name: "username",
        message: "Enter GitHub username:",
        when: (data) => data._role === 'Engineer',
      },
      {
        type: "input",
        name: "school",
        message: "Enter name of school:",
        when: (data) => data._role === 'Intern',
      },
      {
        type: "input",
        name: "officenumber",
        message: "Enter office number:",
        when: (data) => data._role === 'Manager',
      },
      {
        type: "confirm",
        name: "AddMember",
        message: "Add another team member? "
      }
    ])

        //then with the input of position and extra question per type
        .then(function(data) {

          // console.log(data);
          // console.log(data.type);

          if (data._role === 'Manager') {

            //creates a new manager using manager class
            const newManager = new manager(data.name, data.id, data.email, data.officenumber);
            
            //push newManager to answers array
            arrayAnswers.push(newManager);

            arrayHTML = [];

            //read contents of html file
            fs.readFile("./templates/template_manager.html", "utf8", function(err, data) {
              if (err) { throw err;}

              //push the information pulled from the template into an array of HTML data
              arrayHTML.push(data);

              //return the HTML with the placeholders replaced by newManager data
              arrayHTML = arrayHTML.map(arrayHTML => {
                return arrayHTML.replace(/{{ id }}/g, newManager["id"]).replace(/{{ email }}/g, newManager["email"]).replace(/{{ officenumber }}/g, newManager["officeNumber"]).replace(/{{ name }}/g, newManager["name"]).replace(/{{ _role }}/g, newManager.getRole());
                
              });

              //push updated html into array final that will hold all updated html data
              arrayHTMLFinal.push(arrayHTML);

            // end read file
            });

          // end if statement
          }

          if (data._role === 'Intern') {
            
            //creates new intern entry using intern class
            const newIntern = new intern(data.name, data.id, data.email, data.school);

            arrayAnswers.push(newIntern);

            arrayHTML = [];

            //read contents of html file
            fs.readFile("./templates/template_intern.html", "utf8", function(err, data) {    
              if (err) { throw err; }
              
              //push the information pulled from the template into an array of HTML data
              arrayHTML.push(data);

              //return the HTML with the placeholders replaced by newIntern data
              arrayHTML = arrayHTML.map(arrayHTML => {
                return arrayHTML.replace(/{{ id }}/g, newIntern["id"]).replace(/{{ email }}/g, newIntern["email"]).replace(/{{ school }}/g, newIntern["school"]).replace(/{{ name }}/g, newIntern["name"]).replace(/{{ _role }}/g, newIntern.getRole());
                
              });

              //push updated html into array that will hold all updated html data
              arrayHTMLFinal.push(arrayHTML);

            // end read file
            });

          // end if statement
          }

          if (data._role === 'Engineer') {
           
            //creates a new engineer using engineer class
            const newEngineer = new engineer(data.name, data.id, data.email, data.username);

            //push newEngineer to answers array
            arrayAnswers.push(newEngineer);
            
            arrayHTML = [];

            //read contents of html file
            fs.readFile("./templates/template_engineer.html", "utf8", function(err, data) {
              
              if (err) {
                throw err;
              }
              
              //push the information pulled from the template into an array of HTML data
              arrayHTML.push(data);

              //return the HTML with the placeholders replaced by newEngineer data
              arrayHTML = arrayHTML.map(arrayHTML => {
                return arrayHTML.replace(/{{ id }}/g, newEngineer["id"]).replace(/{{ email }}/g, newEngineer["email"]).replace(/{{ username }}/g, newEngineer["github"]).replace(/{{ name }}/g, newEngineer["name"]).replace(/{{ _role }}/g, newEngineer.getRole());
                
              });

              //push updated html into array final that will hold all updated html data
              arrayHTMLFinal.push(arrayHTML);
            
            });

          } 
          
          if (data.AddMember === false) {

            writeFile();

          } else {

            initiate();

          }
      
    //end inquirer
     }); 

}

function writeFile() {

    //read contents of shell html file
    fs.readFile("./templates/template_index.html", "utf8", function(err, data) {
              
      if (err) {
        throw err;
      }

      arrayHTMLFinalTemplate.push(data);

      //return the HTML with the placeholders replaced by newteam data
      arrayHTMLFinalTemplate = arrayHTMLFinalTemplate.map(arrayHTMLFinalTemplate => {
        return arrayHTMLFinalTemplate.replace(/{{ newteam }}/g, arrayHTMLFinal);
      });

      arrayHTMLFinalTemplate = arrayHTMLFinalTemplate.join("");

      // write to new file in output folder
      fs.writeFile("./output/team_index.html", arrayHTMLFinalTemplate, function(err) {
      
        if (err) {
          return console.log(err);
        }
      
        console.log("Success!");
      
        });

    });

  }

//run when app is initialized
initiate();
