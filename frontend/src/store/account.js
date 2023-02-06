import { csrfFetch } from "./csrf"

const LOAD_ORDERS = 'account/loadOrders'
const LOAD_ORDER = 'account/loadOrder'

// Normal action creator
const loadOrders = (orders) => {
    return {
        type: LOAD_ORDERS,
        orders
    }
}

const loadOrder = (order) => {
    return {
        type: LOAD_ORDER,
        order
    }
}



// Thunk action creators
export const getOrders = () => async (dispatch) => {
    const response = await csrfFetch('/api/users/orders')

    if(response.ok) {
        const orders = await response.json()
        dispatch(loadOrders(orders))
        return response
    }
}

export const getOrder = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/orders/${id}`)

    if(response.ok) {
        const order = await response.json()
        dispatch(loadOrder(order))
        return response
    }
}

// state object
const initialState = {orders: [], order: null};

// Reducer
const accountReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_ORDERS: {
            const newState = {...state}
            newState.orders = action.orders
            return newState
        }
        case LOAD_ORDER: {
            const newState = {...state}
            newState.order = action.order
            return newState
        }
        default: {
            return state
        }
    }
}

export default accountReducer
