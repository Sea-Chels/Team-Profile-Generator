const inquirer = require('inquirer');
const fs = require('fs');
var teamArray = [];
var body = ''
var topHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel = "stylesheet" href = "Assets/StyleSheets/style.css">
    <title>Team Builder</title>
</head>
<body>
<header id="top-bar">
    <h1>MY TEAM</h1>
</header>
<section id="card-container">`

var bottomHTML= `</section>
<footer id="footer">
    Such Team. Many Wow. MIT License, or something.  
</footer>
<script src = "Assets/JavaScript/script.js"></script>
</body>
</html>`


function Manager(Name, Id, role = "Manager", email, officeNumber){
this.Name = Name,
this.Id = Id, 
this.role = role,
this.email = email,
this.officeNumber = officeNumber
}

function Intern(Name, Id, role = "Intern", email, school){
    this.Name = Name, 
    this.Id = Id,
    this.role = role, 
    this.email = email,
    this.school = school
    }
function Engineer(Name, Id, role = "Engineer", email, github){
    this.Name = Name, 
    this.Id= Id, 
    this.role = role,
    this.email = email,
    this.github = github
}


const addManager = () => {
    return inquirer.prompt([
      {
          type: 'input',
          message: 'What is your First and Last Name?',
          name: 'managerName',
      },
      {
          type: 'input',
          message: 'What is your employee ID number?',
          name: 'managerID',
      },
      {
          type: 'input',
          message: 'What is your email address?',
          name: 'managerEmail',
      },
      {
          type: 'input',
          message: 'What is your office number?',
          name: 'officeNumber',
      }
    ]);
  };

  const employeeRole = (result) => {
    if (result.employeeRole[0] === "Intern"){
        return inquirer.prompt([
            {
                type: 'input',
                message: 'What is the Interns First and Last Name?',
                name: 'employeeName',
            },
            {
                type: 'input',
                message: 'What is their employee ID number?',
                name: 'employeeId',
            },
            {
                type: 'input',
                message: 'What is their email address?',
                name: 'employeeEmail',
            },
            {
                type: 'input',
                message: 'What school do they go to?',
                name: 'school',
            }
          ]);
    }else if(result.employeeRole[0] === "Engineer"){
        return inquirer.prompt([
            {
                type: 'input',
                message: 'What is their First and Last Name?',
                name: 'employeeName',
            },
            {
                type: 'input',
                message: "What is the Engineer's employee ID number?",
                name: 'employeeId',
            },
            {
                type: 'input', 
                message: 'What is thier email address?',
                name: 'employeeEmail',
            },
            {
                type: 'input',
                message: 'What is their github account name?',
                name: 'github',
            }
          ]);    
    }else {
        return;
    }
  };

  const generateCards = ()=>{

    fs.writeFile("./index.html", topHTML, function(err) {
        if (err) {
            console.log(err);
        };})

    for(let i=0; i < teamArray.length; i++){
    var extraField = '';
            
    if(teamArray[i].role === 'Manager'){
        extraField = ` <p class="extra-field">${teamArray[i].officeNumber}</p>`
    }else if (teamArray[i].role === 'Intern'){
        extraField = ` <p class="extra-field">${teamArray[i].school}</p>`
    }else if (teamArray[i].role === 'Engineer'){
        extraField = ` <p class="extra-field"><a href="github.com/${teamArray[i].github}">${teamArray[i].github}</a></p>`
    }
    let employeeCard = `\n<div class="card"> 
        <div class="card-header">
            <h2 class="worker-name">${teamArray[i].Name}</h2>
            <h4 class="worker-title">${teamArray[i].role}</h4> 
        </div>
        <p class="worker-id">ID: ${teamArray[i].Id}</p>
        <p><a class="worker-email" href="mailto:${teamArray[i].email}">${teamArray[i].email}</a></p>
       ${extraField}
    </div> `;
    console.log(teamArray[i].role)
        body += employeeCard; 
}

let HTML = topHTML + body + bottomHTML;

fs.writeFile("./index.html", HTML, function(err) {
  if (err) {
      console.log(err);
  };})
}

async function addEmployee (){

	var wantAnotherEmployee = await inquirer.prompt([
				{
					message: 'Do you want to add another employee?',
					type: 'confirm',
					name: 'addAnother'
				}
			])
		
			console.log(wantAnotherEmployee);
		
			if (wantAnotherEmployee.addAnother) {
                var result = await inquirer.prompt([
                    {
                        type: 'checkbox',
                        message: "What is the Employee's role that are you adding?",
                        name: 'employeeRole',
                        choices: ['Intern', 'Engineer', "I'm Done"]
                    }
                ])
                console.log(result.employeeRole[0])
                console.log(result.employeeRole);

                var employee = await employeeRole(result); 
            

                if(result.employeeRole[0] == "Intern" ){
                    var newEmployee = new Intern (employee.employeeName, employee.employeeId, role = "Intern", employee.employeeEmail, employee.school)
                    teamArray.push(newEmployee);
                    console.log(teamArray);
                }else if (result.employeeRole[0] == "Engineer"){
                    var newEmployee = new Engineer (employee.employeeName, employee.employeeId, role = "Engineer", employee.employeeEmail, employee.github)
                    teamArray.push(newEmployee);
                    console.log(teamArray);
                }
				console.log('adding  another employee');
				addEmployee ()
			} else {
				console.log('generating HTML...');
                generateCards();
                console.log('HTML generated!')
			}
			
 }

async function init() {
    var manager = await addManager ()

    var newManager = new Manager (manager.managerName, manager.managerID, manager.role = "Manager", manager.managerEmail, manager.officeNumber)

    teamArray.push(newManager);
    console.log(teamArray);

    addEmployee();

}



init ()