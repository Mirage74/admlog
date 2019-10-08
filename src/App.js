import React, { Component } from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
//import {BASE_PATH} from "./config"
import Login from './components/Login'
import Supervisormain from './components/SupervisorMain'
import Viewdeladmins from './components/ViewDelAdmins'
import Editusers from './components/EditUsers'
import Add from './components/Add'
import Client from './components/Client'
import About from './components/About'
import Editexistuser from './components/EditExistUser'
import { Provider } from 'react-redux'
import store from './store'

class App extends Component {

  state = {
    jwt: "empty"
  }

  getJWTcallback = (dataFromChild) => {
    //console.log("getJWTcallback : ", dataFromChild)
    this.setState({ jwt: dataFromChild })
  }

  render() {
    //     <Route path='/add' component={() => { 
    //       window.location.href = 'https://google.com'; 
    //       return null;
    //  }}/>
    //console.log("process.env.PUBLIC_URL : ", process.env.PUBLIC_URL)

    return (
      <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
          <div>
            <div id="root">
              <Switch>
                <Route
                  exact path="/"
                  render={(props) => <Login {...props} jwt={this.getJWTcallback} />}
                />
                <Route
                  exact path="/Login"
                  render={(props) => <Login {...props} jwt={this.getJWTcallback} />}
                />
                <Route
                  path="/SupervisorMain"
                  render={(props) => <Supervisormain {...props} jwt={this.state.jwt} />}
                />
                <Route
                  exact path="/Client"
                  render={(props) => <Client {...props} jwt={this.state.jwt} />}
                />                
                <Route
                  exact path="/Viewdeladmins"
                  render={(props) => <Viewdeladmins {...props} jwt={this.state.jwt} />}
                />
                <Route
                  exact path="/EditUsers"
                  render={(props) => <Editusers {...props} jwt={this.state.jwt} />}
                />
                <Route
                  exact path="/Add"
                  render={(props) => <Add {...props} jwt={this.state.jwt} />}
                />
                <Route exact path='/user/edit/:_id'
                  render={(props) => <Editexistuser {...props} jwt={this.state.jwt} />}
                />
              <Route
                exact path="/About"
                render={(props) => <About {...props} />}
              />                
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
