const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    let query = {}

    const page = req.query.page === undefined ? 1 : parseInt(req.query.page)
    const size = req.query.size === undefined ? 10 : parseInt(req.query.size)
    // const size = 10

    if(isNaN(page) || isNaN(size)) {
        errorResult.errors.push({
            message: 'Requires valid page and size params'
        })
        next(errorResult)
    }

    if(size <= 0) {
        query.limit = 10
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
