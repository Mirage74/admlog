const axios = require('axios')
let pathServer = "http://localhost:4000/checkuserexist"
//let pathServer = "http://proxyservice-env.gujm6w8yic.us-east-2.elasticbeanstalk.com/proxy"
//let pathServer = "https://proxy-service-rest.azurewebsites.net/proxy"




    const configAx = {
      headers: {
        'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZGM2ZGM2MTg4ODQ4MDY2NDFkNDkzMiIsImxvZ2luIjoiZ2RoOGNrd3E1ZCIsImlhdCI6MTU1ODMxNTE5NX0.3iGEiKOdZ1b02_rJ5Pz3Cq4L7qHgVw6_66tYI4KMcZ4',
        //'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMGVlNTQyNGUxNTczMTQyMDY3ZDM2OSIsImxvZ2luIjoibmV3YWRtaW4iLCJpYXQiOjE1NjEzMTYyMjB9._PhAdQubkowJS-xzdrAh5pMFN8D0y7N72FNJuFdltWk'
	'login': 'newadmin2' 
      }
//,
	
  //    "login": "newadmin2" 
    }

axios.get(
    pathServer,
    configAx
)
    .then(res => {
        console.log(res.data)
    })

//"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZGM2ZGM2MTg4ODQ4MDY2NDFkNDkzMiIsImxvZ2luIjoiZ2RoOGNrd3E1ZCIsImlhdCI6MTU1ODQ1MDgxNH0.GcF6KWejWNU5ObQ9l_zgM-WjHo7ZI6RlZ8ATtUmhPE8"
//"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZGM2ZGM2MTg4ODQ4MDY2NDFkNDkzMiIsImxvZ2luIjoiZ2RoOGNrd3E1ZCIsImlhdCI6MTU1ODQ1MDg3Mn0.YJK_clqOup9gS6D-BHh_u5usoKTMi2B7qttpmLXMLn0"