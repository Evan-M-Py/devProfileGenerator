const fs = require("fs");
const inquirer = require("inquirer");
const github = require('github-api');
const axios = require('axios');

inquirer.prompt([
    {
        type: "input",
        message: "What is your Github username?",
        name: "userName"
      },    
    {
      type: "checkbox",
      message: "choose your theme color?",
      name: "colorChoice",
      choices: [
        "dark blue", 
        "light blue", 
        "burnt orange", 
        "monochrome"
      ]
    }
  ]).then((data) => {
    const gh = new github({
        username: '',
        password: ''
     });  

    const userGrab = gh.getProfile(data.userName)
    console.log(userGrab)
  })
