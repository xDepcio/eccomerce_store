const express = require('express')
const {Item, FinalCategory, SubCategory, MainCategory, ItemSpec, Review, sequelize} = require('../../db/models')
const asyncHandler = require('express-async-handler')

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

// Get items in final category
router.get('/:finalCategoryName', asyncHandler(async (req, res) => {
    // console.log(res.locals.query.limit, res.locals.query.offset)
    const items = await FinalCategory.findOne({
        where: {
            name: req.params.finalCategoryName
        },
        include: [
            {
                model: Item,
                offset: res.locals.query.offset,
                limit: res.locals.query.limit
            },
            {
                model: SubCategory,
                include: {
                    model: MainCategory
                }
            }
        ]
    })
    const path = `Wszystkie kategorie/${items.dataValues.SubCategory.dataValues.MainCategory.name}/${items.dataValues.SubCategory.name}/${items.dataValues.name}`

    res.json({
        items: items?.Items,
        path
    })
    // res.json(items?.Items)
}))

// Get item specific data
router.get('/all/:itemId', asyncHandler(async (req, res) => {
    const item = await Item.findOne({
        where: {
            id: req.params.itemId
        },
        attributes: [],
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
            {
                model: ItemSpec,
                attributes: {
                    exclude: [
                        'createdAt',
                        'updatedAt',
                        'itemId',
                        'id',

                    ]
                }
            }
        ]
    })

    res.json({
        ItemSpec: item.ItemSpec,
        path: `Wszystkie kategorie/${item.FinalCategory.SubCategory.MainCategory.name}/${item.FinalCategory.SubCategory.name}/${item.FinalCategory.name}/${item.ItemSpec.name}`
    })
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
            limit: 10,
        },
    })

    console.log(await reviews.countReviews())

    res.json(reviews.Reviews)
}))

// Post item review rating
router.post('/all/:itemId/reviews/:reviewId', asyncHandler(async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId)

    review.reviewRating = review.reviewRating + Math.sign(req.body.ratingValue) // ratingValue is +1 or -1
    Math.sign(req.body.ratingValue) === 1 ? review.thumbsUp += 1 : review.thumbsDown += 1

    await review.save()
    res.json(review)
}))



module.exports = router
