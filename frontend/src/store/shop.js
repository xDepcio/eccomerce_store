import { toValidUrl } from "../utils"
import { csrfFetch } from "./csrf"

const LOAD_CATEGORIES = 'shop/loadCategories'
const LOAD_ITEMS = 'shop/loadItems'

// Normal action creator

const loadCategories = (categories) => {
    return {
        type: LOAD_CATEGORIES,
        categories
    }
}

const loadItems = (items) => {
    return {
        type: LOAD_ITEMS,
        items
    }
}

// Thunk action creators
export const getCategories = (type, parent) => async (dispatch) => {
    const response = await csrfFetch(`/api/items/categories/${type}/${parent}`)

    if(response.ok) {
        const data = await response.json()
        dispatch(loadCategories(data))
        return response
    }
}

export const getCategoryItems = (finalCategoryName, searchParamsObj) => async (dispatch) => {
    const response = await csrfFetch(`/api/items/${finalCategoryName}?` + new URLSearchParams({
        ...searchParamsObj
    }))

    if(response.ok) {
        const data = await response.json()
        console.log(data)
        dispatch(loadItems(data))
        return response
    }
}

// export const loginUser = ({credential, password}) => async (dispatch) => {
//     const response = await csrfFetch('/api/session', {
//         method: 'POST',
//         body: JSON.stringify({
//             credential,
//             password
//         })
//     })

//     if(response.ok) {
//         const data = await response.json()
//         dispatch(loadUser(data.user))
//         return response
//     }
// }

// export const restoreUser = () => async (dispatch) => {
//     const response = await csrfFetch('/api/session')

//     const data = await response.json()
//     dispatch(loadUser(data.user))
//     return response
// }

// export const signupUser = ({email, username, password}) => async (dispatch) => {
//     const response = await csrfFetch('/api/users', {
//         method: 'POST',
//         body: JSON.stringify({
//             email,
//             username,
//             password
//         })
//     })

//     const data = await response.json()
//     dispatch(loadUser(data.user))
//     return response
// }


// state object
const initialState = {categories: null};

// Reducer
const shopReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_CATEGORIES: {
            const newState = {...state, ...action.categories}
            // newState.categories = action.categories
            return newState
        }
        case LOAD_ITEMS: {
            const newState = {...state}
            console.log(action.items)
            // newState.searchedItems = action.items

            let normalizedItems = {}
            action.items.items.forEach((e) => {
                normalizedItems[e.id] = e
            })

            newState.searchedItems = normalizedItems

            return newState
        }
        default: {
            return state
        }
    }
}

export default shopReducer
