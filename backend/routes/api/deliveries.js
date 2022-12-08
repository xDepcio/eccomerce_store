const express = require('express')
const { Delivery, Item, FinalCategory, SubCategory, MainCategory, UserVoteReview, ItemSpec, CategoriesGraphicsAttributesItem, Review, sequelize} = require('../../db/models')
const asyncHandler = require('express-async-handler')
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize')

const router = express.Router()

// Get avalible deliveries
router.get('/', asyncHandler(async (req, res) => {
    const deliveries = await Delivery.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })

    res.json(deliveries)
}))

module.exports = router
