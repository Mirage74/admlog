const axios = require('axios')
let pathServer = "http://localhost:4000/login"
//let pathServer = "http://proxyservice-env.gujm6w8yic.us-east-2.elasticbeanstalk.com/proxy"
//let pathServer = "https://proxy-service-rest.azurewebsites.net/proxy"


const configAx = {
  "login": "newadmin", 
  "password": "123456" 
  }
axios.post(
    pathServer,
    configAx
)
    .then(res => {
        console.log(res.data)
    })

//'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMGVlNTQyNGUxNTczMTQyMDY3ZDM2OSIsImxvZ2luIjoibmV3YWRtaW4iLCJpYXQiOjE1NjEzMTYyMjB9._PhAdQubkowJS-xzdrAh5pMFN8D0y7N72FNJuFdltWk'