import { csrfFetch } from "./csrf"

const LOAD_USER = 'session/loadUser'
const REMOVE_USER = 'session/removeUser'
const LOAD_ALL_USER_ADDRESSES = 'session/loadAllUserAddresses'
const LOAD_DEFAULT_USER_ADDRESS = 'session/loadDefaultUserAddress'

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

const loadAllUserAddresses = (addresses) => {
    return {
        type: LOAD_ALL_USER_ADDRESSES,
        addresses
    }
}

const loadDefaultUserAddress = (address) => {
    return {
        type: LOAD_DEFAULT_USER_ADDRESS,
        address
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

export const logoutUser = () => async (dispatch) => {
    const respone = await csrfFetch('/api/session', {
        method: 'DELETE'
    })

    if(respone.ok) {
        dispatch(removeUser())
        const data = await respone.json()
        return data
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

export const getAllUserAddresses = () => async (dispatch) => {
    const response = await csrfFetch('/api/users/address')

    if(response.ok) {
        const addresses = await response.json()
        dispatch(loadAllUserAddresses(addresses))
        return response
    }
}

export const getDefaultUserAddress = () => async (dispatch) => {
    const response = await csrfFetch('/api/users/address/default')

    if(response.ok) {
        const address = await response.json()
        dispatch(loadDefaultUserAddress(address))
        return response
    }
}

export const postNewAddress = (payload) => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/users/address', {
            method: 'POST',
            body: JSON.stringify({...payload})
        })

        const data = response.json()
        dispatch(getAllUserAddresses())
        return data
    }
    catch(err) {
        const data = err.json()
        return data
    }
}

export const updateDefaultAddress = (newAddressId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/address/default`, {
        method: 'POST',
        body: JSON.stringify({newAddressId})
    })

    if(response.ok) {
        const data = await response.json()
        dispatch(getAllUserAddresses())
        dispatch(getDefaultUserAddress())
        return data
    }
}

export const postNewUser = (payload) => async (dispatch) => {
    const respone = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({...payload})
    })
    console.log('============')
    if(respone.ok) {
        const data = await respone.json()
        console.log(data, 'signup data')
        dispatch(loadUser(data.user))
        return data
    }
}

export const changeCredentails = ({newEmail, newPassword, currentPassword, currentEmail}) => async (dispatch) => {
    const respone = await csrfFetch('/api/users', {
        method: 'PATCH',
        body: JSON.stringify({
            newEmail,
            newPassword,
            currentPassword,
            currentEmail
        })
    })

    if(respone.ok) {
        const data = await respone.json()
        console.log('DATA FRIN CHANGNE', data)
        dispatch(loadUser(data))
        return data
    }
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
        case LOAD_ALL_USER_ADDRESSES: {
            const newState = {...state}
            newState.user.addresses = action.addresses
            return newState
        }
        case LOAD_DEFAULT_USER_ADDRESS: {
            const newState = {...state}
            newState.user.defaultAddress = action.address
            return newState
        }
        default: {
            return state
        }
    }
}

export default sessionReducer
