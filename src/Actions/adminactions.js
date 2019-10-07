import { GET_ADMINS, DELETE_ADMIN, GET_USER, GET_USERS, ADD_USER, DELETE_USER, UPDATE_USER, ADD_APP, GET_APPS, DELETE_APP, SET_APPS } from '../Actions/types'
import { AUTH_SERVER } from "../config"
import axios from 'axios'


export const getAdmins = jwt => async dispatch => {
  //axios.defaults.baseURL = AUTH_SERVER + 'admins'
  //let pathServer = "http://localhost:4000/admins"
  const configAx = {
    headers: {
      'Authorization': jwt
    }
  }
  const res = await axios.get(AUTH_SERVER + 'admins', configAx)
  //console.log("res : ", res)
  dispatch({
    type: GET_ADMINS,
    payload: res.data
  })
  return (res.data)
}


export const deleteAdmin = id => async dispatch => {
  console.log("action deleteAdmin ", id)
  const configAx = {
    headers: {
      //withCredentials: true
    }
  }
  await axios.delete(AUTH_SERVER + `admins/${id}`, configAx)
  dispatch({
    type: DELETE_ADMIN,
    payload: id
  })
}

export const deleteUser = id => async dispatch => {
  await axios.delete(AUTH_SERVER + `users/${id}`)
  dispatch({
    type: DELETE_USER,
    payload: id
  })
}

export const addUser = user => async dispatch => {
  //console.log("addUser from ACTION")
  dispatch({
    type: ADD_USER,
    payload: user
  })
}


export const getUsers = jwt => async dispatch => {
  //console.log("getUsers from ACTION")
  const configAx = {
    headers: {
      'Authorization': jwt
    }
  }
  //console.log("getusers action configAx : ", configAx)
  const res = await axios.get(AUTH_SERVER + 'users', configAx)
  //console.log("res getUsers data: ", res.data[6])
  dispatch({
    type: GET_USERS,
    payload: res.data
  })
  return (res.data)
}



export const getUser = (jwt, id) => async dispatch => {
  //console.log(id)
  const configAx = {
    headers: {
      'Authorization': jwt
    }
  }
  const res = await axios.get(AUTH_SERVER + `user/edit/${id}`, configAx)
  dispatch({
    type: GET_USER,
    payload: res.data
  })
  return (res.data)
}

export const updUser = (jwt, id, user) => async dispatch => {
  //console.log(user)
  const configAx = {
    method: 'put',
    data: user
  }
  console.log("path put", AUTH_SERVER + `user/edit/${id}`)
  const res = await axios.put(AUTH_SERVER + `user/edit/${id}`, configAx)
  .catch(err => {
    console.log("error updating user : ", err)
  })
  dispatch({
    type: UPDATE_USER,
    payload: res.data
  })
  return res.data
}



export const getApps = () => async dispatch => {
  dispatch({
    type: GET_APPS
  })
}


export const addApp = app => async dispatch => {
  //console.log("addApp action: ", app) 
  dispatch({
    type: ADD_APP,
    payload: app
  })
}

export const deleteApp = appName => async dispatch => {
  dispatch({
    type: DELETE_APP,
    payload: appName
  })
}

export const setApps = apps => async dispatch => {
  dispatch({
    type: SET_APPS,
    payload: apps
  })
}
