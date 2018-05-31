import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import hashUrl from './hashUrl'
import login from './login'
import fetchError from './fetchError'

const rootReducer = combineReducers({
    routing: routerReducer,
    hashUrl,
	login,
    fetchError,
})

export default rootReducer


