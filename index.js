const fs = require("fs");
const inquirer = require("inquirer");
const GitHub = require('github-api');
const axios = require('axios');
const pdf = require('html-pdf');
  

async function generalQuery(data) {
  const queryUrl = `https://api.github.com/users/${data.userName}`;
  const ajax = await axios.get(queryUrl).then(function (res) {
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




function writeToFile(html) {
  fs.writeFile('devOne.html', html, (err) => {
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

async function generateHTML(data, dataTwo, dataThree) {
  const theHtml =  `<!DOCTYPE html>
  <html lang="en">
     <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <title>Document</title>
      </head>
        <body>
        <div class="wrapper">
          <div class="photo-header">
            <p><img id="prof-img" src="${dataTwo.profileIMG}"></img></p>
            <h1>Hello World!</h1>
            <h1>My name is ${dataTwo.gitName}!</h1>
            <div>
              <h4><img src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-512.png" width="30" height="30"><a ></a></h4>
              <h4><img src="https://image.flaticon.com/icons/png/512/25/25231.png" width="30" height="30"><a href=>GitHub</a></h4>
              <h4><img src="https://www.freeiconspng.com/uploads/blogger-logo-icon-png-28.png" width="30" height="30"><a>Blog</a></h4>
            </div>
          </div>
        </div>
        <h2 id="bio">${dataTwo.gitBio}</h2>
        <div class="container">
          <div class='row'>
            <div class='col'>
              <div class="card">
              <h3>Public Repositories:</h3>${dataThree.repoNum}
              </div>
              <div class="card">
              <h3>GitHub Stars</h3>${dataThree.starredNum}
              </div>
            </div>
            <div class='col'>
              <div class="card">
              <h3>Followers</h3>${dataThree.followerNum}
              </div>
              <div class="card">
              <h3>Following</h3>${dataThree.followingNum}
              </div>
            </div>
          </div>
        </div>
        <div class="wrapper"></div>
        </body>
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
           height: 85%;
           }
           .wrapper {
           background-color: ${data.color[0].wrapperBackground};
           padding-top: 100px;
           text-align:center;
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
           background-color: ${data.color[0].headerBackground};
           color: ${data.color[0].headerColor};
           padding: 10px;
           width: 95%;
           border-radius: 6px;
           }
           #prof-img {
           width: 300px;
           height: 300px;
           border-radius: 50%;
           object-fit: cover;
           margin-top: -75px;
           border: 6px solid ${data.color[0].photoBorderColor};
           box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
           }
           .photo-header h1, .photo-header h2 {
           width: 100%;
           text-align: center;
           }
           .photo-header h1 {
           margin-top: 10px;
           }
           .container {
           padding: 50px;
           padding-left: 100px;
           padding-right: 100px;
           text-align:center;
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
             background-color: ${data.color[0].headerBackground};
             color: ${data.color[0].headerColor};
             margin: 20px;
           }
           .col {
           flex: 1;
           text-align: center;
           }
           #bio {
            margin-top: 5%;
            text-align: center;
            padding-top: 5%;
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
        </html>`
  return theHtml
}

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
    const color = await data.color;
    const profRes = await generalQuery(data)
    const { profileIMG, gitName, gitLink, gitBio } = profRes

    const specificRes =  await specificQueries(data);
  

    const genHtml = await generateHTML(data, profRes, specificRes)

    await writeToFile(genHtml);
    const htmlPage = await fs.readFileSync('./devOne.html', 'utf8')
    const options = { format: 'letter'};;

    pdf.create(genHtml).toFile('./profile.pdf', function (err, res) {
      if (err) return console.log('ERROR INDEX.JS LINE 24');
      console.log('Success!!!!');
  });




    
    
    

  })};
init();


