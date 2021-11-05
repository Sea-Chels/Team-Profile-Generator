
const inquirer = require('inquirer');
const fs = require('fs');

const userPrompts = ()=>{
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
                type: 'checkbox',
                message: 'Add an Employee',
                name: 'addEmployee',
                choices: ['Intern', 'Engineer']
            },
        ])
        .then((response) =>{
                if(response.addEmployee === "Intern"){
                    inquirer.prompt([ 
                    {
                        type: 'input',
                        message: "What is the Intern's First and Last Name?",
                        name: 'internName',
                        },
                        {
                        type: 'input',
                        message: 'What is your employee ID number?',
                        name: 'internID',
                        },
                        {
                        type: 'input',
                        message: "What is the Intern's email address?",
                        name: 'internEmail',
                        },
                        {
                            type: 'input',
                            message: "Where does the Intern go to school?",
                            name: 'internSchool',
                        }
                    ])  
                }else if(response.addEmployee === "Engineer"){
                    inquirer.prompt([ 
                    {
                        type: 'input',
                        message: "What is the Intern's First and Last Name?",
                        name: 'engineerName',
                        },
                        {
                        type: 'input',
                        message: 'What is your employee ID number?',
                        name: 'engineerID',
                        },
                        {
                        type: 'input',
                        message: "What is the Intern's email address?",
                        name: 'engineerEmail',
                        },
                        {
                        type: 'input',
                        message: "What is the Engineer's Github?",
                        name: 'engineerGithub',
                        }
                    ])
                
            }

        });
}




// var cardContainer = document.getElementById('card-container');
var card = '';
var cardHeader = '';


var contentName = '';
var contentId = '';
var contentEmail = '';
var contentGitHub = '';
var contentSchool = '';
var contentOfficeNumber = '';
//---------------------------------------------------------------------------------------

// Use writeFileSync method to use promises instead of a callback function

// const promptUser = () => {
//   return inquirer.prompt([
//     {
//       type: 'input',
//       name: 'managerName',
//       message: 'What is your First and Last Name?',
//     },
//     {
//       type: 'input',
//       name: 'managerID',
//       message: 'What is your employee ID number?',
//     },
//     {
//       type: 'input',
//       name: 'managerEmail',
//       message: 'What is your email address?',
//     },
//     {
//       type: 'input',
//       name: 'managerOfficeNumber',
//       message: 'What is your office number?',
//     },
//     {
//         type: 'checkbox',
//         message: 'Add an Employee',
//         name: 'addEmployee',
//         choices: ['Intern', 'Engineer'],
//     },
//   ]);
// };

const generateHTML = ({ name, location, github, linkedin }) =>
  `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel = "stylesheet" href = "Assets/StyleSheets/style.css">
      <title>Team Builder</title>
  </head>
  <body>

  <footer id="footer">
    Such Team. Many Wow. MIT License or something. 
</footer>

<script src = "Assets/JavaScript/script.js"></script>
</body>
</html>`;

// Bonus using writeFileSync as a promise
const init = () => {
    userPrompts()
  // Use writeFileSync method to use promises instead of a callback function
    // .then((answers) => fs.writeFileSync('index.html', generateHTML(answers), appendEmployee(answers)))
    // .then(() => console.log('Successfully wrote to index.html'))
    .catch((err) => console.error(err));
};

init();

var card =''; 


//  function appendEngineer(name, role, id, email, github, school, officeNumber){
//  card= `<div class="example card">  
// <div class="card-header">
//     <h2 class="worker-name">${name}</h2>
//     <h4 class="worker-title">${role}</h4> 
// </div>
// <p class="worker-id">ID: ${id}</p>
// <p class="worker-email">${email}</p>
// </div> `
// if (contentGitHub != null){
//     card += `<p class="phone-number">${officeNumber}</p>`
// }
//  }
// //----------------------------------------------------------------------------------------
// function appendEmployee(name, role, id, email, github, school, officeNumber){
//     // cardContainer.innerHTML= '';

//     card = document.createElement('div');
//     card.classList.add('card');
//     card.innerHTML = `<div class="card-header">
//     <h2 class="worker-name">${name}</h2>
//     <h4 class="worker-title">${role}</h4> 
//     </div>`

//     //adds ID
//     contentId = document.createElement('p')
//     contentId.classList.add("worker-id")
//     contentId.innerHTML =  `ID: ${id}`
    
//     //adds email
//     contentEmail = document.createElement('p')
//     contentEmail.classList.add('worker-email')
//     contentEmail.innerHTML = `<a href="mailto:${email}">${email}</a>`

//     //append everything in order// 
//     cardContainer.appendChild(card);
//     card.appendChild(contentId);
//     card.appendChild(contentEmail);

//     //special cases:
//     if(github !=null){
//         contentGitHub = document.createElement('p');
//         contentGitHub.innerHTML = `<a href="https://github.com/${github}">Github: ${github}</a>`
//         contentGitHub.classList.add('worker-github'); 
//         card.appendChild(contentGitHub)
//     }
//     if(school !=null){
//         contentSchool = document.createElement('p');
//         contentSchool.innerHTML = `School: ${school}`
//         contentSchool.classList.add('worker-school'); 
//         card.appendChild(contentSchool);
//     }
//     if(officeNumber != null){
//         contentOfficeNumber = document.createElement('p');
//         contentOfficeNumber.innerHTML = `Office Number: ${officeNumber}`
//         contentOfficeNumber.classList.add('worker-number'); 
//         card.appendChild(contentOfficeNumber);        
//     }
// };

//runs the function
appendEmployee("John Doe", "manager", 21, "jd@example.com", "johnDoe", "towson", null)



//dkndfjndfjnvskdf okay so I need to have the initial manager prompts. then they ney need to add an employee, so i should add a quiestion that says add employee? y/n thenif yes then it asks which kind of employy - engineer or intern, then once the manager has chosen THAT then it goes to the specific prompts of the intern or the engineer. THEN it takes the questions and puts them into an html documents. so I should have and employee append and then a different manager append, right? the functions owuld only be used once and then I can just use employee, but then at the end of the add employeee questions it should have a "add another employee? Y/N" then it should restart the prompts to add an employee, so I should make that a different function so that I dont have to rewrite that code. 

//manager prompts, w/ add employee question
//then prompts the user to say which question (maybe put in different function?)
//then if user input is engineer vs intern show the appropriate questions. 
//get the answers of those questions and put them in the appropriate append employee function
//have the names on the function 

