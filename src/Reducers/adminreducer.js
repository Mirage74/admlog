import { GET_ADMINS, DELETE_ADMIN, GET_USER, GET_USERS, ADD_USER, DELETE_USER, UPDATE_USER, ADD_APP, GET_APPS, DELETE_APP, SET_APPS } from '../Actions/types'

const initialState = {
  admins: [],
  users: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ADMINS:
      //console.log("PAYLOAD : ", action.payload)
      return {
        ...state,
        admins: action.payload
      }
    case DELETE_ADMIN:
      return {
        ...state,
        admins: state.admins.filter(
          admin => admin._id !== action.payload
        )
      }

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(
          user => user._id !== action.payload
        )
      }

    case GET_USER:
      //console.log("PAYLOAD get user : ", action.payload)
      return {
        ...state,
        user: action.payload
      }
    case ADD_USER:
      //console.log("PAYLOAD add user : ", action.payload)
      return {
        ...state,
        users: [action.payload, ...state.users]
      }

    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(
          user =>
            user._id === action.payload._id
              ? (user = action.payload)
              : user
        )
      }


    case GET_USERS:
      return {
        ...state,
        users: action.payload
      }

    case GET_APPS:
      return state

    case ADD_APP:
      // console.log("red state.apps ", state.apps)
      // console.log("action.payload ", action.payload)
      // console.log([action.payload, ...state.apps])

      return {
        ...state,
        apps: [action.payload, ...state.apps]
      }

    case DELETE_APP:
      return {
        ...state,
        apps: state.apps.filter(
          user => user.appName !== action.payload
        )
      }

    case SET_APPS:
      if (action.payload.length > 0) {
        return {
          ...state,
          apps: action.payload
        }
      } else {
        return {
          ...state,
          apps: []
        }
      }

    default:
      return state

  }
}




