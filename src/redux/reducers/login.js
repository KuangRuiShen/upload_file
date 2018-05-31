import {
  REQUEST_USERINFO,RECEIVE_USERINFO,CLEAR_USERINFO
} from '../actions/login'

const initState = sessionStorage.getItem('userLogin') ? {data:JSON.parse(sessionStorage.getItem('userLogin'))} : {data:null}

const login = (state = initState, action) => {
  switch (action.type) {
      case REQUEST_USERINFO:
        return {...state,loading:true,data:null}
      case RECEIVE_USERINFO:
        return {...state, loading:false,data:action.data}
      case CLEAR_USERINFO:
        return {...state, loading: false, data:null}
    default:
      return state
  }

}

export default login