const asyncHandler = require('express-async-handler')
const {Item, FinalCategory, SubCategory, MainCategory, UserVoteReview, ItemSpec, Review, sequelize} = require('../../db/models')

const valdiatePostReview = asyncHandler(async (req, res, next) => {
    const item = await Item.findOne({
        where: {
            id: parseInt(req.params.itemId)
        }
    })

    if(!item) {
        next(new Error('item not found'))
    }

    req.body.submittedRating = parseInt(req.body.submittedRating)
    req.body.submittedRating = Math.max(0, Math.min(req.body.submittedRating, 5))

    next()
})

module.exports = valdiatePostReview
