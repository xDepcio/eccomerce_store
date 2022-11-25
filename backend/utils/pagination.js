const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    const defaultPageValue = 1
    const defaultSizeValue = 20

    let query = {}

    let page = req.query.page === undefined ? 1 : parseInt(req.query.page)
    let size = req.query.size === undefined ? 20 : parseInt(req.query.size)
    // const size = 10

    if(isNaN(page)) page = defaultPageValue
    if(isNaN(size)) size = defaultSizeValue

    if(size <= 0) {
        query.limit = 20
    }
    else {
        query.limit = size
    }

    if(page <= 0) {
        query.offset = 0
    }
    else {
        query.offset = query.limit * (page - 1)
    }

    if(size == 0 && page == 0) {
        delete query.offset
        delete query.limit
    }
    console.log(query)

    // console.log('================================', query)
    res.locals.query = query
    next()
})



module.exports = router;
