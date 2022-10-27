import { csrfFetch } from "./csrf"

const LOAD_USER = 'session/loadUser'
const REMOVE_USER = 'session/removeUser'

// Normal action creator
const loadUser = (user) => {
    return {
        type: LOAD_USER,
        user
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}


// Thunk action creators
export const loginUser = ({credential, password}) => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    })

    if(response.ok) {
        const data = await response.json()
        dispatch(loadUser(data.user))
        return response
    }
}

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session')

    const data = await response.json()
    dispatch(loadUser(data.user))
    return response
}

export const signupUser = ({email, username, password}) => async (dispatch) => {
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            email,
            username,
            password
        })
    })

    const data = await response.json()
    dispatch(loadUser(data.user))
    return response
}


// state object
const initialState = {user: null};

// Reducer
const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_USER: {
            const newState = {...state}
            newState.user = action.user
            // console.log('LOADING USER')
            return newState
        }
        case REMOVE_USER: {
            const newState = {...state}
            newState.user = null
            return newState
        }
        default: {
            return state
        }
    }
}

export default sessionReducer
