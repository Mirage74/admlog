const axios = require('axios')
let pathServer = "http://localhost:4000/login"
//let pathServer = "http://proxyservice-env.gujm6w8yic.us-east-2.elasticbeanstalk.com/proxy"
//let pathServer = "https://proxy-service-rest.azurewebsites.net/proxy"


const configAx = {
  "login": "gdh8ckwq5d", 
  "password": "z$cgKX?Qqwh?5+wV" 
  }
axios.post(
    pathServer,
    configAx
)
    .then(res => {
        console.log(res.data)
    })

//"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZGM2ZGM2MTg4ODQ4MDY2NDFkNDkzMiIsImxvZ2luIjoiZ2RoOGNrd3E1ZCIsImlhdCI6MTU1ODQ1MDgxNH0.GcF6KWejWNU5ObQ9l_zgM-WjHo7ZI6RlZ8ATtUmhPE8"
//"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZGM2ZGM2MTg4ODQ4MDY2NDFkNDkzMiIsImxvZ2luIjoiZ2RoOGNrd3E1ZCIsImlhdCI6MTU1ODQ1MDg3Mn0.YJK_clqOup9gS6D-BHh_u5usoKTMi2B7qttpmLXMLn0"