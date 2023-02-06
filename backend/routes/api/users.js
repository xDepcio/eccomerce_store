const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, verifyLoginUser } = require('../../utils/auth');
const { User, Review, UserVoteReview, Address, Order, Item, sequelize } = require('../../db/models');
const { Op } = require('sequelize');


const router = express.Router()

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    // check('username')
    //     .exists({ checkFalsy: true })
    //     .isLength({ min: 4 })
    //     .withMessage('Please provide a username with at least 4 characters.'),
    // check('username')
    //     .not()
    //     .isEmail()
    //     .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];


// Signup new user
router.post('/', validateSignup, asyncHandler( async (req, res, next) => {
    // const {email, username, password} = req.body
    // const user = await User.signup({email, password, username})
    const {email, firstName, lastName, password} = req.body
    const user = await User.signup({email, password, firstName, lastName})

    await setTokenCookie(res, user)

    return res.json({
        user
    })
}))


// get user votes and reviews associated with them
router.get('/:userId/reviews/:itemId', requireAuth, asyncHandler(async (req, res) => {
    const reviews = await User.findByPk(req.user.id, {
        include: {
            model: Review,
            where: {
                itemId: req.params.itemId
            },
            attributes: [
                'id',
                'itemId',
            ],
            through: {
                attributes: ['voteValue']
            }
        },
        attributes: []
    })

    res.json(reviews? reviews.Reviews : [])
}))


// get user review associated with item
router.get('/reviews/:itemId', requireAuth, asyncHandler(async (req, res, next) => {
    try {
        const reviews = await Review.findOne({
            where: {
                reviewerId: req.user.id,
                itemId: req.params.itemId
            }
        })
        res.json(reviews)
        console.log(!![].length)
    }
    catch(err) {
        err.message = 'User is undefined!!!!xd'
        console.log('trewrewrwe')
        next(err)
    }

}))


// Get all user addreses
router.get('/address', requireAuth, asyncHandler(async (req, res) => {
    const userAddresses = await User.findByPk(req.user.id, {
        include: {
            model: Address,
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })

    res.json(userAddresses.Addresses)
}))


// Get users default addres
router.get('/address/default', requireAuth, asyncHandler(async (req, res) => {
    const userDefaultAddress = await Address.findByPk(req.user.defaultAddressId)

    res.json(userDefaultAddress)
}))


// Update default address // Trzeba dać weryfikacje czy podany adres nalezey do usera
router.post('/address/default', requireAuth, asyncHandler(async (req, res) => {
    // const newDefaultAddress = await Address.findByPk(req.body.newAddressId)
    const foundUserAddress = await User.findByPk(req.user.id, {
        include: {
            model: Address,
            where: {
                id: req.body.newAddressId
            }
        }
    })

    if(foundUserAddress) {
        foundUserAddress.defaultAddressId = req.body.newAddressId
        await foundUserAddress.save()
    }

    res.json(foundUserAddress)

}))


// Post new user address
router.post('/address', requireAuth, asyncHandler(async (req, res, next) => {
    try {
        const newAddress = await Address.create({...req.body, userId: req.user.id})
        console.log('============================')
        console.log(newAddress)
        console.log(req.body)
        res.json(newAddress)
    }
    catch(err) {
        console.log('catched')
        next(err)
    }
}))


// Update user credentials
router.patch('/', requireAuth, verifyLoginUser, asyncHandler(async (req, res) => {
    const user = await User.scope('loginUser').findByPk(req.user.id)

    console.log(req.body)
    console.log(user)

    if(req.body.newPassword) {
        user.hashedPassword = bcrypt.hashSync(req.body.newPassword)
    }
    if(req.body.newEmail) {
        user.email = req.body.newEmail
    }

    await user.save()
    console.log(user)
    return res.json(user)
}))

// Get user single order
router.get('/orders/:id', requireAuth, asyncHandler(async (req, res) => {
    const userOrders = await User.findByPk(req.user.id, {
        include: [
            {
                model: Order,
                where: {
                    id: req.params.id
                },
                include: {
                    model: Address
                }
            }
        ]
    })

    for(let j = 0; j < userOrders.Orders.length; j++) {
        console.log('============')
        const items = userOrders.Orders[j].items.split(':')
        console.log('items', items)
        let itemsIds = {}
        items.forEach((ele, i) => {
            const [id, price, count] = ele.split(',')
            itemsIds[id] = {price, count}
        })
        console.log(itemsIds)

        const orderItems = await Item.findAll({
            where: {
                id: {
                    [Op.in]: Object.keys(itemsIds)
                }
            },
            attributes: {
                exclude: [
                    'description',
                    'stripePriceId',
                    'specs',
                    'createdAt',
                    'updatedAt'
                ]
            },
            raw: true
        })

        for(let item of orderItems) {
            item.boughtCount = parseInt(itemsIds[item.id].count)
            item.boughtPrice = parseInt(itemsIds[item.id].price)
        }
        console.log('bewtter', orderItems)
        userOrders.dataValues.Orders[j].dataValues.boughtItems = orderItems

        let totalOrderPrice = 0
        for(let {price, count} of Object.values(itemsIds)) {
            totalOrderPrice += count * price
        }
        userOrders.dataValues.Orders[j].dataValues.totalOrderPrice = totalOrderPrice
    }


    return res.json(userOrders.Orders[0])
}))

// Get user orders
router.get('/orders', requireAuth, asyncHandler(async (req, res) => {
    const userOrders = await User.findByPk(req.user.id, {
        order: [[sequelize.col('Orders.createdAt'), 'DESC']],
        include: [
            {
                model: Order,
            }
        ]
    })

    for(let j = 0; j < userOrders.Orders.length; j++) {
        console.log('============')
        const items = userOrders.Orders[j].items.split(':')
        console.log('items', items)
        let itemsIds = {}
        items.forEach((ele, i) => {
            const [id, price, count] = ele.split(',')
            itemsIds[id] = {price, count}
        })
        console.log(itemsIds)

        const orderItems = await Item.findAll({
            where: {
                id: {
                    [Op.in]: Object.keys(itemsIds)
                }
            },
            attributes: {
                exclude: [
                    'description',
                    'stripePriceId',
                    'specs',
                    'createdAt',
                    'updatedAt'
                ]
            },
            raw: true
        })

        for(let item of orderItems) {
            item.boughtCount = parseInt(itemsIds[item.id].count)
            item.boughtPrice = parseInt(itemsIds[item.id].price)
        }
        console.log('bewtter', orderItems)
        userOrders.dataValues.Orders[j].dataValues.boughtItems = orderItems

        let totalOrderPrice = 0
        for(let {price, count} of Object.values(itemsIds)) {
            totalOrderPrice += count * price
        }
        userOrders.dataValues.Orders[j].dataValues.totalOrderPrice = totalOrderPrice
    }

    res.json(userOrders.Orders)
}))


module.exports = router
