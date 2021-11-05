const inquirer = require('inquirer');
const fs = require('fs');

function Manager(managerName, managerID, managerEmail, officeNumber){
this.Name = managerName,
this.Id = managerID, 
this.email = managerEmail,
this.officeNumber = officeNumber
}

function Intern(Name, Id, email, school){
    this.Name = Name, 
    this.Id = Id, 
    this.email = email,
    this.school = school
    }
function Engineer(Name, Id, email, github){
    this.Name = Name, 
    this.Id= Id, 
    this.email = email,
    this.github = github
}


// Use writeFileSync method to use promises instead of a callback function

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
    },
    {
        type: 'checkbox',
        message: 'Add an Employee',
        name: 'addEmployee',
        choices: ['Intern', 'Engineer', "I'm Done"]
    }
  ]);
};

const addEmployee = (result) => {
    if (result.addEmployee[0] === "Intern"){
        return inquirer.prompt([
            {
                type: 'input',
                message: 'What is the Interns First and Last Name?',
                name: 'employeeName',
            },
            {
                type: 'input',
                message: 'What is their employee ID number?',
                name: 'employeeID',
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
            },
            {
                type: 'checkbox',
                message: 'Add an Employee?',
                name: 'addEmployee',
                choices: ['Intern', 'Engineer', "I'm Done"]
            }
          ]);
    }else if(result.addEmployee[0] === "Engineer"){
        return inquirer.prompt([
            {
                type: 'input',
                message: 'What is their First and Last Name?',
                name: 'engineerName',
            },
            {
                type: 'input',
                message: "What is the Engineer's employee ID number?",
                name: 'engineerID',
            },
            {
                type: 'input',
                message: 'What is thier email address?',
                name: 'engineerEmail',
            },
            {
                type: 'input',
                message: 'What is their github account name?',
                name: 'github',
            },
            {
                type: 'checkbox',
                message: 'Add an Employee',
                name: 'addEmployee',
                choices: ['Intern', 'Engineer', "I'm Done"]
            }
          ]);    
    }else {
        return;
    }
  };

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
    Such Team. Many Wow. MIT License. 
</footer>
<script src = "Assets/JavaScript/script.js"></script>
</body>
</html>`


const generateManagerCard = ()=>{
    let managerCard = `\n<div class="card"> 
        <div class="card-header">
            <h2 class="worker-name">${newManager.Name}</h2>
            <h4 class="worker-title">Manager</h4> 
        </div>
        <p class="worker-id">ID: ${newManager.Id}</p>
        <a class="worker-email" href="mailto:${newManager.email}">${newManager.email}</a>
        <p class="phone-number">${newManager.officeNumber}</p>
    </div> `;
    let firstHTML = topHTML + managerCard
     fs.writeFile("./index.html", firstHTML, function(err) {
            if (err) {
                console.log(err);
            };})
}

const generateInternCard = () =>{
    let internCard = `<div class="card"> 
        <div class="card-header">
            <h2 class="worker-name">${newIntern.Name}</h2>
            <h4 class="worker-title">Intern</h4> 
        </div>
        <p class="worker-id">ID: ${newIntern.Id}</p>
        <a class="worker-email" href="mailto:${newIntern.email}">${newIntern.email}</a>
        <p class="phone-number">${newIntern.school}</p>
    </div> `;
     fs.appendFile("./index.html", internCard, function(err) {
            if (err) {
                console.log(err);
            }})
} 
const generateEngineerCard = () => {
    let engineerCard = `<div class="card"> 
        <div class="card-header">
            <h2 class="worker-name">${newEngineer.Name}</h2>
            <h4 class="worker-title">Intern</h4> 
        </div>
        <p class="worker-id">ID: ${newEngineer.Id}</p>
        <a class="worker-email" href="mailto:${newEngineer.email}">${newEngineer.email}</a>
        <a class="github" href="github.com/${newEngineer.github}">${newEngineer.gihutb}</a>
    </div> `;

     fs.appendFile("./index.html", engineerCard, function(err) {
            if (err) {
                console.log(err);
            }})
}
function finishHTMLFile () {
    fs.appendFile("./index.html", bottomHTML, function(err) {
        if (err) {
            console.log(err);
        }})
    }
var newManager = {};
var newIntern = {};
var newEngineer = {};
var result = '';
var employeeData = ''

async function employeeAsync (){
    console.log("Moving to employee questions")
    employeeData = await addEmployee(result);
    if (result.addEmployee[0] === "Intern"){
        console.log("You've created an Intern!");
        newIntern = new Intern(employeeData.employeeName,employeeData.employeeID, employeeData.employeeEmail, employeeData.school)
        generateInternCard(newIntern);
    }else if(result.addEmployee[0] ==="Engineer"){
        console.log("You've created an Engineer!")
        newEngineer = new Engineer (employeeData.employeeName, employeeData.employeeID, employeeData.employeeEmail, employeeData.github)
        generateEngineerCard(newEngineer);
    } 
    if (employeeData.addEmployee[0] !== "I'm Done"){
        let result = employeeData
        let results = await addEmployee(result);   
        let final = employeeAsync(results);
        console.log(final.addEmployee)
        // if (final.addEmployee[0]=== "I'm Done"){
        //     return false;
        // }
    }else{
        finishHTMLFile();
        console.log("html file has been written successfully.")
    }

    console.log(employeeData)
}


async function init() {
    try{
        console.log('calling');
        result = await addManager();
        newManager = new Manager(result.managerName, result.managerID, result.managerEmail, result.officeNumber);
        generateManagerCard(newManager);
        console.log(result.addEmployee);
        if(result.addEmployee[0] !== "I'm Done"){
            employeeAsync(result);
        }else{
            console.log("You're a one-person team? Amazing!")
            finishHTMLFile();
            console.log("html file has been written successfully.")
        };
    }catch(err){
        console.log(err);
    }
  }

init();


// const init = () => {
//   addManager()
//   .then ( (answers) => {
//     newManager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.officeNumber);
//     generateManagerCard(newManager);
//       if(answers.addEmployee !== "I'm Done"){
//           addEmployee(answers);
//       }else {
//           console.log("You're a one-person team? Amazing!")
//       }
//   }).then(finishHTMLFile())
//     .then(() => console.log('Successfully wrote to index.html'))
//     .catch((err) => console.error(err));
// };