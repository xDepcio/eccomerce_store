import { csrfFetch } from "./csrf"

const LOAD_ORDERS = 'account/loadOrders'

// Normal action creator
const loadOrders = (orders) => {
    return {
        type: LOAD_ORDERS,
        orders
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

// state object
const initialState = {orders: []};

// Reducer
const accountReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_ORDERS: {
            const newState = {...state}
            newState.orders = action.orders
            return newState
        }
        default: {
            return state
        }
    }
}

export default accountReducer
