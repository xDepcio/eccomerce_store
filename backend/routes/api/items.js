const express = require('express')
const {Item, FinalCategory, SubCategory,
    MainCategory, UserVoteReview, ItemSpec,
    CategoriesGraphicsAttributesItem,
    Review, sequelize, AttributesGamingMouse,
    AttributesProcessor} = require('../../db/models')
const asyncHandler = require('express-async-handler')
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize')
const valdiatePostReview = require('../../utils/validate/validatePostReview')

const router = express.Router()

router.use('/', require('../../utils/pagination'))

// Get categories based on depth and tree path
router.get('/categories/:type/:parent', asyncHandler(async (req, res) => {
    console.log(req.params.type)
    let categories = {}
    let path = {}
    if(req.params.type === 'finalCategories') {
        categories = await SubCategory.findOne({
            where: {
                name: req.params.parent
            },
            include: [
                {
                    model: FinalCategory
                },
                {
                    model: MainCategory
                },
            ]
        })

        res.json({
            finalCategories: categories.FinalCategories.map((e, i) => e.dataValues),
            path: `Wszystkie kategorie/${categories.MainCategory.dataValues.name}/${categories.dataValues.name}`
        })
        return
    }
    else if(req.params.type === 'subCategories') {
        categories = await MainCategory.findOne({
            where: {
                name: req.params.parent
            },
            include: [
                {
                    model: SubCategory
                }
            ]
        })

        res.json({
            subCategories: categories.SubCategories,
            path: `Wszystkie kategorie/${categories.name}`
        })
        return
    }
    else if(req.params.type === 'mainCategories') {
        categories = await MainCategory.findAll()

        res.json({
            mainCategories: categories,
            path: 'Wszystkie kategorie'
        })
        return
    }

    res.json({
        message: 'no ANSEWT'
    })
}))

// // Get items in final category
// router.get('/:finalCategoryName', asyncHandler(async (req, res) => {
//     // console.log(res.locals.query.limit, res.locals.query.offset)
//     const items = await FinalCategory.findOne({
//         where: {
//             name: req.params.finalCategoryName
//         },
//         include: [
//             {
//                 model: Item,
//                 offset: res.locals.query.offset,
//                 limit: res.locals.query.limit
//             },
//             {
//                 model: SubCategory,
//                 include: {
//                     model: MainCategory
//                 }
//             }
//         ]
//     })
//     const path = `Wszystkie kategorie/${items.dataValues.SubCategory.dataValues.MainCategory.name}/${items.dataValues.SubCategory.name}/${items.dataValues.name}`

//     res.json({
//         items: items?.Items,
//         path
//     })
//     // res.json(items?.Items)
// }))

// Get current path
router.get('/:finalCategoryName/path', asyncHandler(async (req, res) => {
    const items = await FinalCategory.findOne({
        where: {
            name: req.params.finalCategoryName
        },
        include: [
            {
                model: SubCategory,
                include: {
                    model: MainCategory
                }
            }
        ]
    })
    const path = `Wszystkie kategorie/${items.dataValues.SubCategory.dataValues.MainCategory.name}/${items.dataValues.SubCategory.name}/${items.dataValues.name}`

    res.json(path)
}))

// Get item specific data
router.get('/all/:itemId', asyncHandler(async (req, res) => {
    const item = await Item.findOne({
        where: {
            id: req.params.itemId
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [
            {
                model: FinalCategory,
                attributes: ['name'],
                include: {
                    model: SubCategory,
                    attributes: ['name'],
                    include: {
                        model: MainCategory,
                        attributes: ['name'],
                    }
                }
            },
            // {
            //     model: ItemSpec,
            //     attributes: {
            //         exclude: [
            //             'createdAt',
            //             'updatedAt',
            //             'itemId',
            //             'id',
            //         ]
            //     }
            // }
        ]
    })

    const path = `Wszystkie kategorie/${item.FinalCategory.SubCategory.MainCategory.name}/${item.FinalCategory.SubCategory.name}/${item.FinalCategory.name}/${item.name}`
    delete item.dataValues.FinalCategory

    res.json({
        ItemSpec: item,
        path: path
    })
}))

// Get all items from cart
router.get('/list/:itemsId', asyncHandler(async (req, res) => {

    const itemsIds = JSON.parse(req.params.itemsId)

    let items = await Item.findAll({
        where: {
            id: {
                [Op.or]: itemsIds
            }
        },
        attributes: {
            exclude: [
                'description',
                'createdAt',
                'updatedAt',
                'specs',
                'categoryId'
            ]
        }
    })

    items.map((e, i) => {
        e.imagesUrl = e.imagesUrl.split(' ')[0]
        // e.dataValues.count = itemsCount[i]
    })

    // console.log(items)
    res.json(items)
}))

// Get item reviews
router.get('/all/:itemId/reviews', asyncHandler(async (req, res) => {

    let order
    switch(req.query.sortBy) {
        case 'rating': {
            order = [['reviewRating', 'DESC']]
            break
        }
        case 'dateDesc': {
            console.log('===============')
            order = [['createdAt', 'DESC']]
            break
        }
        case 'dateAsc': {
            order = [['createdAt', 'ASC']]
            break
        }
        default: {
            order = [['reviewRating', 'DESC']]
            break
        }
    }

    const reviews = await Item.findByPk(req.params.itemId, {
        include: {
            model: Review,
            order: order,
            limit: res.locals.query.limit,
            offset: res.locals.query.offset
        },
    })

    console.log(await reviews.countReviews())

    res.json(reviews.Reviews)
}))

// Post item review rating
router.post('/all/reviews/:reviewId/rating', requireAuth, asyncHandler(async (req, res) => {
    const voteValue = Math.sign(req.body.ratingValue)

    const review = await Review.findByPk(req.params.reviewId)
console.log('1=======================')
    const userFoundReviewVote = await UserVoteReview.findOne({
        where: {
            [Op.and]: {
                userId: req.user.id,
                reviewId: review.id
            }
        },
    })
    console.log('2=======================')

    if(userFoundReviewVote) {
        if(userFoundReviewVote.voteValue === voteValue) {
            console.log('userFoundReviewVote', userFoundReviewVote)
            await UserVoteReview.destroy({
                where: {
                    [Op.and]: {
                        userId: req.user.id,
                        reviewId: review.id
                    }
                }
            })

            review.reviewRating -= voteValue
            voteValue === 1 ? review.thumbsUp -= 1 : review.thumbsDown -= 1
        }
        else {
            userFoundReviewVote.voteValue = voteValue
            review.reviewRating = review.reviewRating + voteValue*2
            voteValue === 1 ? review.thumbsDown -= 1 : review.thumbsUp -= 1
            voteValue === 1 ? review.thumbsUp += 1 : review.thumbsDown += 1
            console.log('+++++++++++++++++++')
            console.log({...userFoundReviewVote.dataValues})
            // await userFoundReviewVote.save()
            // console.log()
            await UserVoteReview.destroy({
                where: {
                    [Op.and]: {
                        userId: req.user.id,
                        reviewId: review.id
                    }
                }
            })
            await UserVoteReview.create({...userFoundReviewVote.dataValues})
        }
    }
    else {
        await UserVoteReview.create({
            userId: req.user.id,
            reviewId: review.id,
            voteValue: voteValue
        })

        review.reviewRating += voteValue
        voteValue === 1 ? review.thumbsUp += 1 : review.thumbsDown += 1
    }
    console.log('3=======================')
    // review.reviewRating = review.reviewRating + voteValue // ratingValue is +1 or -1
    // voteValue === 1 ? review.thumbsUp += 1 : review.thumbsDown += 1

    await review.save()

    res.json(review)
}))

// Post item review
router.post('/:itemId/reviews', requireAuth, valdiatePostReview, asyncHandler(async (req, res) => {
    console.log(req.body)

    const newReview = await Review.create({
        reviewerFirstName: req.user.firstName,
        reviewContent: req.body.submittedReviewDesc,
        reviewerId: req.user.id,
        itemId: req.params.itemId,
        rating: req.body.submittedRating
    })

    res.json(newReview)
}))

// get items in final category with or witout filters
router.get('/:finalCategoryName', asyncHandler(async (req, res) => {

    Object.keys(req.query).map((e, i) => req.query[e] = req.query[e].split(','))
    console.log(req.query, '<- query')

    // const payload = {...req.query}
    // console.log(payload)
    console.log(req.params, 'PARAMS')

    function formatFilterQuery(payload) {
        const payloadKeys = Object.keys(payload)
        const payloadValues = Object.values(payload)

        const queryKeysToSkip = {
            size: true,
            page: true,
            sortBy: true,
            minPrice: true,
            maxPrice: true
        }
        const whereQuery = {}

        for(let i = 0; i < payloadKeys.length; i++) {
            let key = payloadKeys[i]

            if(queryKeysToSkip[key]) {
                continue
            }
            const filtersList = []

            payloadValues[i].forEach((keyValue, j) => {
                filtersList.push({[Op.like]: keyValue})
            })

            whereQuery[key] = {
                [Op.or]: filtersList
            }
        }

        return whereQuery
    }

    const whereQuery = formatFilterQuery(req.query)

    let prices = {}
    if(req.query.minPrice && req.query.maxPrice) {
        prices.price = {
            [Op.and]: [
                {[Op.gte]: req.query.minPrice},
                {[Op.lte]: req.query.maxPrice},
            ]
        }
    }

    // console.log(req.query)
    // console.log('whereQuery', whereQuery)

    let model
    // console.log(req.params.finalCategoryName, 'params')
    switch (req.params.finalCategoryName) {
        case 'Karty graficzne': {
            model = CategoriesGraphicsAttributesItem
            console.log('model', model)
            break;
        }
        case 'Procesory': {
            model = AttributesProcessor
            console.log('model', model)
            break;
        }
        case 'Myszki gamingowe': {
            model = AttributesGamingMouse
            console.log('model', model)
            break;
        }
        default: {
            console.log('model not FOUND ERRR')
            break;
        }
    }

    let order
    switch (req.query.sortBy?.[0]) {
        case 'price-desc':
            order = [['Item', 'price', 'DESC']]
            break;
        case 'price-asc':
            order = [['Item', 'price', 'ASC']]
            break;
        default:
            order = []
            break;
    }
    // console.log(model, '330')
    console.log(model, order, '375')

    // model = CategoriesGraphicsAttributesItem
    const items = await model.findAll({
        include: {
            model: Item,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'description']
            },
            where: {
                ...prices
            }
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'id', 'itemId']
        },
        // where: {
        //     memorySize: {
        //         [Op.or]: [
        //             {[Op.like]: '2'},
        //             {[Op.like]: 4},
        //         ]
        //     },
        //     producent: {
        //         [Op.or]: [
        //             {[Op.like]: 'amd'},
        //         ]
        //     }
        //     // graphicChip: {
        //     //     [Op.or]: [
        //     //         {[Op.like]: '%rtx 3060%'},
        //     //         {[Op.like]: '%rtx 3070%'},
        //     //     ]
        //     // }
        // }
        where: whereQuery,
        order: order,
        limit: res.locals.query.limit,
        offset: res.locals.query.offset,
    })

    // items.forEach((e) => {
        // console.log(e.Item.dataValues)
    // })
    // console.log([...items.map((e) => e.Item.dataValues)])
    // console.log(items)
    res.json([...items.map((e) => {
        let specs = {...e.dataValues}
        delete specs.Item
        let dataValues = {...e.Item.dataValues, specs: specs}
        // console.log(specs)
        // console.log(dataValues)
        return dataValues
        // {...e.Item.dataValues, specs: 't'}
    })])
    // res.json(items)
    // res.json([...items.map((e) => e.Item.dataValues)])
}))

// get attributes associated to final category
// router.get('/:finalCategoryName/attributes', asyncHandler(async (req, res) => {
//     let model
//     // console.log(req.params.finalCategoryName, 'params')
//     switch (req.params.finalCategoryName) {
//         case 'Karty graficzne': {
//             model = CategoriesGraphicsAttributesItem
//             console.log('model', model)
//             break;
//         }
//         case 'Procesory': {
//             model = AttributesProcessor
//             console.log('model', model)
//             break;
//         }
//         case 'Myszki gamingowe': {
//             model = AttributesGamingMouse
//             console.log('model', model)
//             break;
//         }
//         default: {
//             console.log('model not FOUND ERRR')
//             break;
//         }
//     }

//     let data = Object.keys(model.rawAttributes)
//     data = data.filter((e) => {
//         return !['createdAt', 'updatedAt', 'id', 'itemId'].includes(e)
//     })
//     console.log(data, 'TTT')
//     res.json(data)
// }))



module.exports = router
