const express = require('express')
// const { apiKey,permission } = require('../auth/checkAuth')
const router=express.Router()






router.use('/api', require('./access'))
// router.use('/v1/api/discount', require('./discount'))
// router.use('/v1/api/product', require('./product'))

module.exports = router