const express = require('express')
const {Item, FinalCategory, SubCategory, MainCategory} = require('../../db/models')
const asyncHandler = require('express-async-handler')

const router = express.Router()

router.use('/', require('../../utils/pagination'))

// Get categories base on depth and tree path
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


router.get('/:finalCategoryName', asyncHandler(async (req, res) => {
    console.log(res.locals.query.limit, res.locals.query.offset)
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

//
// router.post('/', validateLogin, asyncHandler(async (req, res, next) => {
//     console.log('LOGINGNGNGNGN')
//     const {credential, password} = req.body

//     const user = await User.login({credential, password})

//     if (!user) {
//         const err = new Error('Login failed');
//         err.status = 401;
//         err.title = 'Login failed';
//         err.errors = ['The provided credentials were invalid.'];
//         return next(err);
//     }

//     await setTokenCookie(res, user);

//     return res.json({
//         user
//     });
// }))

// // Log out
// router.delete('/', (_req, res) => {
//     res.clearCookie('token');
//     return res.json({ message: 'success' });
// });

// // Restore session user
// router.get('/', restoreUser, (req, res) => {
//     const { user } = req;
//     if (user) {
//         return res.json({
//             user: user.toSafeObject()
//         });
//     }
//     else return res.json({});
// });




module.exports = router
