import {
  SET_HASH_URL,SET_TRANSITION,SET_JUMP_MODE
} from '../actions/hashUrl'



const hashUrl = (state={oldUrl:'/',currentUrl:'/',transition:'none'},action) => {
  switch (action.type) {
    case SET_HASH_URL:
    case SET_TRANSITION:
    case SET_JUMP_MODE:
      return {...state,...action.data}
    default:
      return state
  }
  
}

export default hashUrl;