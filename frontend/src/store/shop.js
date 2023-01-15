import { toValidUrl } from "../utils"
import { csrfFetch } from "./csrf"

const LOAD_CATEGORIES = 'shop/loadCategories'
const LOAD_ITEMS = 'shop/loadItems'
const LOAD_SINGLE_ITEM = 'shop/loadSingleItem'
const LOAD_ITEM_REVIEWS = 'shop/loadItemReviews'
const LOAD_USER_REVIEWS_VOTES = 'shop/loadUserReviewsVotes'
const UPDATE_USER_REVIEW_VOTE = 'shop/updateUserReviewVote'
const LOAD_USER_ITEM_REVIEW = 'shop/loadUseritemReview'
const LOAD_FILTERED_ITEMS = 'shop/loadFilteredItems'
const LOAD_PATH = 'shop/loadPath'
const SET_SORT_BY = 'shop/setSortBy'
const SET_PAGE_SIZE = 'shop/setPageSize'
const SET_PAGE_NUMBER = 'shop/setPageNumber'
const SET_QUERY_PARAM = 'shop/setQueryParam'
const SET_CART_LENGTH = 'shop/setCartLength'
const LOAD_CART_ITEMS_SPECS = 'shop/loadCartItemsSpecs'
const ADD_CART_ITEM = 'shop/addCartItem'
const REMOVE_CART_ITEM = 'shop/removeCartItem'
const LOAD_CART = 'shop/loadCart'
const LOAD_DELIVERIES = 'shop/loadDeliveries'
const ADD_SEARCH_FILTER = 'shop/addSearchFilter'
const REMOVE_SEARCH_FILTER = 'shop/removeSearchFilter'
const CLEAR_QUERY = 'shop/clearQueryParams'

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

const loadSingleItem = (item) => {
    return {
        type: LOAD_SINGLE_ITEM,
        item
    }
}

const loadItemReviews = (reviews, page) => {
    return {
        type: LOAD_ITEM_REVIEWS,
        reviews,
        page
    }
}

const loadUserReviewsVotes = (reviews) => {
    return {
        type: LOAD_USER_REVIEWS_VOTES,
        reviews
    }
}

const updateUserReviewVote = (review) => {
    return {
        type: UPDATE_USER_REVIEW_VOTE,
        review
    }
}

const loadUserItemReview = (review) => {
    return {
        type: LOAD_USER_ITEM_REVIEW,
        review
    }
}

const loadFilteredItems = (items, maxPrice, minPrice) => {
    return {
        type: LOAD_FILTERED_ITEMS,
        items,
        maxPrice,
        minPrice
    }
}

const loadPath = (path) => {
    return {
        type: LOAD_PATH,
        path
    }
}

export const setSortBy = (sortBy) => {
    return {
        type: SET_SORT_BY,
        sortBy
    }
}

export const setPageSize = (pageSize) => {
    return {
        type: SET_PAGE_SIZE,
        pageSize
    }
}

export const setPageNumber = (pageNumber) => {
    return {
        type: SET_PAGE_NUMBER,
        pageNumber
    }
}

export const setQueryParam = (paramName, paramValue) => {
    return {
        type: SET_QUERY_PARAM,
        paramName,
        paramValue
    }
}

export const setCartLength = (cartLength) => {
    return {
        type: SET_CART_LENGTH,
        cartLength,
    }
}

export const loadCartItemsSpecs = (cartItemsSpecs) => {
    return {
        type: LOAD_CART_ITEMS_SPECS,
        cartItemsSpecs,
    }
}

export const addCartItem = (itemId) => {
    return {
        type: ADD_CART_ITEM,
        itemId,
    }
}

export const removeCartItem = (itemId, removeAll=false) => {
    return {
        type: REMOVE_CART_ITEM,
        itemId,
        removeAll
    }
}

export const loadCart = () => {
    return {
        type: LOAD_CART,
    }
}

const loadDeliveries = (deliveries) => {
    return {
        type: LOAD_DELIVERIES,
        deliveries
    }
}

export const addSearchFilter = (filterName, filterValue) => {
    return {
        type: ADD_SEARCH_FILTER,
        filterName,
        filterValue
    }
}

export const removeSearchFilter = (filterName, filterValue) => {
    return {
        type: REMOVE_SEARCH_FILTER,
        filterName,
        filterValue
    }
}

export const clearQueryParams = () => {
    return {
        type: CLEAR_QUERY,
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

export const getFinalCategoryPath = (finalCategoryName) => async (dispatch) => {
    const response = await csrfFetch(`/api/items/${finalCategoryName}/path`)

    if(response.ok) {
        const path = await response.json()
        dispatch(loadPath(path))
        return response
    }
}

// export const getCategoryItems = (finalCategoryName, searchParamsObj) => async (dispatch) => {
//     const response = await csrfFetch(`/api/items/${finalCategoryName}?` + new URLSearchParams({
//         ...searchParamsObj
//     }))

//     if(response.ok) {
//         const data = await response.json()
//         // console.log(data)
//         dispatch(loadItems(data))
//         return response
//     }
// }

export const getFilteredCategoryItems = (finalCategoryName, searchUrlStr='') => async (dispatch) => {
    const response = await csrfFetch(`/api/items/${finalCategoryName}?` + searchUrlStr)

    if(response.ok) {
        const data = await response.json()
        const {items, maxPrice, minPrice} = data
        dispatch(loadFilteredItems(items, maxPrice, minPrice))
        return response
    }
}

export const getSingleItem = (itemId) => async (dispatch) => {
    const response = await csrfFetch(`/api/items/all/${itemId}`)

    if(response.ok) {
        const data = await response.json()
        // console.log(data)
        dispatch(loadSingleItem(data))
        return response
    }
}

export const getItemReviews = (itemId, sortBy, page) => async (dispatch) => {
    const response = await csrfFetch(`/api/items/all/${itemId}/reviews?sortBy=${sortBy}&page=${page}&size=${2}`)

    if(response.ok) {
        const data = await response.json()
        // console.log(data)
        dispatch(loadItemReviews(data, page))
        return response
    }
}

export const getUserReviewsVotes = (userId, itemId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/reviews/${itemId}`)

    if(response.ok) {
        const data = await response.json()
        // console.log(data)
        dispatch(loadUserReviewsVotes(data))
        return response
    }
}

export const sendUserReviewVote = (reviewId, voteValue) => async (dispatch) => {
    const response = await csrfFetch(`/api/items/all/reviews/${reviewId}/rating`, {
        method: 'POST',
        body: JSON.stringify({
            ratingValue: voteValue
        })
    })

    if(response.ok) {
        const review = await response.json()
        dispatch(getItemReviews(review.itemId))
        dispatch(getUserReviewsVotes(undefined, review.itemId))
    }
}

export const sendItemReview = (itemId, submittedRating, submittedReviewDesc) => async (dispatch) => {
    const response = await csrfFetch(`/api/items/${itemId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            submittedRating,
            submittedReviewDesc
        })
    })

    if(response.ok) {
        const data = await response.json()
        console.log('DATATATA', data)
        return response
    }
}

export const getUserItemReview = (itemId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/reviews/${itemId}`)

    if(response.ok) {
        const review = await response.json()
        // console.log('DATATATA', data)
        dispatch(loadUserItemReview(review))
    }
}

export const getCartItems = (itemsId) => async (dispatch) => {
    itemsId = itemsId.map((e) => e.itemId)
    console.log(JSON.stringify(itemsId))
    const response = await csrfFetch(`/api/items/list/${JSON.stringify(itemsId)}`)

    if(response.ok) {
        const cartItemsSpecs = await response.json()
        // console.log('DATATATA', data)
        dispatch(loadCartItemsSpecs(cartItemsSpecs))
    }
}

export const getDeliveries = () => async (dispatch) => {
    const response = await csrfFetch(`/api/deliveries`)

    if(response.ok) {
        const deliveries = await response.json()
        dispatch(loadDeliveries(deliveries))
    }
}



// state object
const initialState = {
    categories: null,
    reviews: [],
    queryParams: {
        page: 1,
        filters: {}
    },
    cart: {
        items: [],
        cartLength: 0,
        itemsSpecs: {}
    },
    maxPrice: 10,
    minPrice: 0
};

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
            // console.log(action.items)
            // newState.searchedItems = action.items

            let normalizedItems = {}
            action.items.items.forEach((e) => {
                normalizedItems[e.id] = e
            })

            newState.searchedItems = normalizedItems
            newState.path = action.items.path

            return newState
        }
        case LOAD_PATH: {
            const newState = {...state}
            newState.path = action.path
            return newState
        }
        case LOAD_SINGLE_ITEM: {
            const newState = {...state}
            newState.item = action.item.ItemSpec
            newState.path = action.item.path
            newState.item.imagesUrl = newState.item.imagesUrl.split(' ')
            newState.item.specs = JSON.parse(newState.item.specs)
            return newState
        }
        case LOAD_ITEM_REVIEWS: {
            const newState = {...state}
            console.log(action)
            newState.reviews = [...newState.reviews.slice(0, 2*(action.page-1)), ...action.reviews]
            return newState
        }
        case LOAD_USER_REVIEWS_VOTES: {
            const newState = {...state}
            let userReviewsVotes = {}
            action.reviews.forEach((e, i) => {
                userReviewsVotes[e.id] = e
            })
            newState.userReviewsVotes = userReviewsVotes
            return newState
        }
        case LOAD_FILTERED_ITEMS: {
            const newState = {...state}

            // let normalizedItems = {}
            // action.items.forEach((e) => {
            //     normalizedItems[e.id] = e
            // })

            // newState.searchedItems = normalizedItems

            newState.searchedItems = action.items
            newState.maxPrice = action.maxPrice
            newState.minPrice = action.minPrice
            return newState
        }
        case LOAD_USER_ITEM_REVIEW: {
            const newState = {...state}
            newState.userItemReview = action.review
            return newState
        }
        case ADD_SEARCH_FILTER: {
            const newState = {...state}
            const currFilters = newState.queryParams.filters

            if(currFilters[action.filterName]) {
                currFilters[action.filterName] = [...currFilters[action.filterName], action.filterValue]
            }
            else {
                currFilters[action.filterName] = [action.filterValue]
            }
            newState.queryParams = {...newState.queryParams}
            return newState
        }
        case REMOVE_SEARCH_FILTER: {
            const newState = {...state}
            const currFilters = newState.queryParams.filters

            currFilters[action.filterName].splice(
                currFilters[action.filterName].indexOf(action.filterValue), 1
            )

            newState.queryParams = {...newState.queryParams}
            return newState
        }
        case SET_QUERY_PARAM: {
            const newState = {...state}
            newState.queryParams = {...newState.queryParams, [action.paramName]: action.paramValue}
            return newState
        }
        case SET_CART_LENGTH: {
            const newState = {...state}
            console.log(action.cartLength)
            if(!action.cartLength) return newState
            newState.cartLength = action.cartLength
            return newState
        }
        case LOAD_CART_ITEMS_SPECS: {
            const newState = {...state}

            let normalizedItemsSpecs = {}
            action.cartItemsSpecs.forEach((e) => {
                normalizedItemsSpecs[e.id] = e
            })

            newState.cart.itemsSpecs = normalizedItemsSpecs

            return newState
        }
        case ADD_CART_ITEM: {
            const newState = {...state}
            console.log(newState)

            let itemAlreadyInCart = false
            let newCartItems = [...newState.cart.items]
            newCartItems.forEach((e) => {
                if(e.itemId === action.itemId) {
                    e.count += 1
                    itemAlreadyInCart = true
                }
            })

            if(!itemAlreadyInCart) {
                newCartItems.push({itemId: action.itemId, count: 1})
                newState.cart.cartLength += 1
            }

            newState.cart.items = newCartItems
            window.localStorage.setItem('cart', JSON.stringify(newState.cart))

            return newState
        }
        case REMOVE_CART_ITEM: {
            const newState = {...state}

            let newCartItems = [...newState.cart.items]
            newCartItems.forEach((e, i) => {
                if(e.itemId === action.itemId) {
                    if(action.removeAll) {
                        newCartItems.splice(i, 1)
                        newState.cart.cartLength -= 1
                    }
                    else {
                        e.count -= 1

                    }
                }
            })

            newState.cart.items = newCartItems
            window.localStorage.setItem('cart', JSON.stringify(newState.cart))

            return newState
        }
        case LOAD_CART: {
            const newState = {...state}

            if(JSON.parse(window.localStorage.getItem('cart'))) {
                newState.cart = JSON.parse(window.localStorage.getItem('cart'))
            }

            return newState
        }
        case LOAD_DELIVERIES: {
            const newState = {...state}
            newState.cart.deliveries = action.deliveries
            return newState
        }
        case CLEAR_QUERY: {
            const newState = {...state}
            newState.queryParams = {...newState.queryParams, filters: {}}
            return newState
        }
        default: {
            return state
        }
    }
}

export default shopReducer
