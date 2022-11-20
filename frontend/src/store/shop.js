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

const loadFilteredItems = (items) => {
    return {
        type: LOAD_FILTERED_ITEMS,
        items
    }
}

const loadPath = (path) => {
    return {
        type: LOAD_PATH,
        path
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
        const items = await response.json()
        dispatch(loadFilteredItems(items))
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



// state object
const initialState = {categories: null, reviews: []};

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

            let normalizedItems = {}
            action.items.forEach((e) => {
                normalizedItems[e.id] = e
            })

            newState.searchedItems = normalizedItems
            return newState
        }
        case LOAD_USER_ITEM_REVIEW: {
            const newState = {...state}
            newState.userItemReview = action.review
            return newState
        }
        default: {
            return state
        }
    }
}

export default shopReducer
