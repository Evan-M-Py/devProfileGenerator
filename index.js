const fs = require("fs");
const inquirer = require("inquirer");
const GitHub = require('github-api');
const axios = require('axios');

function init() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is your Github username?",
      name: "userName"
    },
    {
      type: "checkbox",
      message: "choose your theme color?",
      name: "color",
      choices: [
        { name: 'green', value: colors.green, short: 'green' },
        { name: 'blue', value: colors.blue, short: 'blue' },
        { name: 'pink', value: colors.pink, short: 'pink' },
        { name: 'red', value: colors.red, short: 'red' }]
    }
  ]).then(async function (data) {
    const profRes =  generalQuery(data)
    const { profileIMG, gitName, gitLink, gitBio } = profRes

    const specificRes =  await specificQueries(data);
    console.log(specificRes)
  })};

    // repoQuery(data)
    // const reposNum = data.data.length
    // console.log(reposNum)


    // emailQuery(data)


    // const profilePicQueryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    // const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

  

function generalQuery(data) {
  const queryUrl = `https://api.github.com/users/${data.userName}`;
  const ajax =  axios.get(queryUrl).then(function (res) {
    const gitUserInfo = {
      profileIMG: res.data.avatar_url,
      gitName: res.data.login,
      gitLink: res.data.html_url,
      gitBio: res.data.bio
    }
    return(gitUserInfo);
  })
  return(ajax);
};

async function specificQueries(data) {
  

  const repoUrl = `https://api.github.com/users/${data.userName}/repos`;
  const repoAjax = await axios.get(repoUrl).then(function(res) { 
    const repoRes = res.data.length
    return (repoRes)});


  const followerUrl = `https://api.github.com/users/${data.userName}/followers`;
  const followerAjax = await axios.get(followerUrl).then(function (res) {
    const followerRes = res.data.length
    return (followerRes)})

  const starUrl = `https://api.github.com/users/${data.userName}/starred`;
  const starAjax = await axios.get(starUrl).then(function (res) {
    const starRes = res.data.length
    return (starRes)})

  const followingUrl = `https://api.github.com/users/${data.userName}/repos`;
  const followingAjax = await axios.get(followingUrl).then(function (res) {
    const followingRes = res.data.length
    return (followingRes)})

  const mixedInfo =  {repoNum: repoAjax, followerNum: followerAjax, starredNum: starAjax,followingNum: followingAjax}
  return(mixedInfo);

}




function writeToFile(data) {
  fs.writeFile('test.html', data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })
};



const colors = {
  green: {
    name: 'green',
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  blue: {
    name: 'blue',
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    name: 'pink',
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    name: 'red',
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};

function generateHTML(data) {
  return `<!DOCTYPE html>
  <html lang="en">
     <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <title>Document</title>
        <style>
            @page {
              margin: 0;
            }
           *,
           *::after,
           *::before {
           box-sizing: border-box;
           }
           html, body {
           padding: 0;
           margin: 0;
           }
           html, body, .wrapper {
           height: 100%;
           }
           .wrapper {
           background-color: ${colors[data.color].wrapperBackground};
           padding-top: 100px;
           }
           body {
           background-color: white;
           -webkit-print-color-adjust: exact !important;
           font-family: 'Cabin', sans-serif;
           }
           main {
           background-color: #E9EDEE;
           height: auto;
           padding-top: 30px;
           }
           h1, h2, h3, h4, h5, h6 {
           font-family: 'BioRhyme', serif;
           margin: 0;
           }
           h1 {
           font-size: 3em;
           }
           h2 {
           font-size: 2.5em;
           }
           h3 {
           font-size: 2em;
           }
           h4 {
           font-size: 1.5em;
           }
           h5 {
           font-size: 1.3em;
           }
           h6 {
           font-size: 1.2em;
           }
           .photo-header {
           position: relative;
           margin: 0 auto;
           margin-bottom: -50px;
           display: flex;
           justify-content: center;
           flex-wrap: wrap;
           background-color: ${colors[data.color].headerBackground};
           color: ${colors[data.color].headerColor};
           padding: 10px;
           width: 95%;
           border-radius: 6px;
           }
           .photo-header img {
           width: 250px;
           height: 250px;
           border-radius: 50%;
           object-fit: cover;
           margin-top: -75px;
           border: 6px solid ${colors[data.color].photoBorderColor};
           box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
           }
           .photo-header h1, .photo-header h2 {
           width: 100%;
           text-align: center;
           }
           .photo-header h1 {
           margin-top: 10px;
           }
           .links-nav {
           width: 100%;
           text-align: center;
           padding: 20px 0;
           font-size: 1.1em;
           }
           .nav-link {
           display: inline-block;
           margin: 5px 10px;
           }
           .workExp-date {
           font-style: italic;
           font-size: .7em;
           text-align: right;
           margin-top: 10px;
           }
           .container {
           padding: 50px;
           padding-left: 100px;
           padding-right: 100px;
           }
  
           .row {
             display: flex;
             flex-wrap: wrap;
             justify-content: space-between;
             margin-top: 20px;
             margin-bottom: 20px;
           }
  
           .card {
             padding: 20px;
             border-radius: 6px;
             background-color: ${colors[data.color].headerBackground};
             color: ${colors[data.color].headerColor};
             margin: 20px;
           }
           
           .col {
           flex: 1;
           text-align: center;
           }
  
           a, a:hover {
           text-decoration: none;
           color: inherit;
           font-weight: bold;
           }
  
           @media print { 
            body { 
              zoom: .75; 
            } 
           }
        </style>
      </head>
  
      <body>
          <div class="wrapper">
              <div class="photo-header">
                  <div class="photo-header"><img src="" alt=""></div>
                  <h1 id="hello"></h1>
                  <h2 id="name intro"></h2>
                  <h3 id="education"></h3>
                  <div id="linkage">
                      <a href=""></a>
                      <a href=""></a>
                      <a href=""></a>
                      <a href=""></a>
                  </div>
              </div>
  
              <div class="container">
                  <div class="row">
                      <h2>I write code and save lives!</h2>                   
                  </div>
              </div>
  
              <div class="container">
                  <div class="row">
                      <div class="col">
                          <div class="card">Public Repositories
                              <h5></h5>
                          </div>
                          <div class="card">Github Stars
                              <h5></h5>
                          </div>
                      </div>
                      <div class="col">
                          <div class="card">Followers
                              <h5></h5>
                          </div>
                          <div class="card">Following
                              <h5></h5>
                          </div>
                      </div>
                  </div>
              </div>
  
              <div class="container">
                  <div class="row">
                      <div class="card"></div>
                  </div>
              </div>
              
              
          </div>
          
      </body>
      </html>`
}
init();



        // const queryUrl = `https://api.github.com/users/${userName}/repos?per_page=100`;

        // axios.get(queryUrl).then(function(res) {
        //     console.log(res)

          //       const repoNames = res.data.map(function(repo) {
    //         return repo.name;
    //       });

    //       const repoNamesStr = repoNames.join("\n");
    //  console.log(repoNames)
    //  console.log(repoNamesStr)


          // fs.writeFile("repos.txt", repoNamesStr, (err) => {
          //   if (err) {
          //     throw err;}

          //   console.log(`Saved ${repoNames.length} repos`);
          // });
        // });