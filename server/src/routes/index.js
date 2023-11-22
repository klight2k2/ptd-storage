const express = require('express')
const { authentication } = require('../auth/authUtils')
// const { apiKey,permission } = require('../auth/checkAuth')
const router=express.Router()






router.use('/api', require('./access'))
router.use('/api',authentication)
router.use('/api/ingredient', require('./ingredient'))
router.use('/api/import',require('./import'))
router.use('/api/recipe', require('./recipe'))
router.use('/api/log', require('./log'))
// router.use('/v1/api/discount', require('./discount'))
// router.use('/v1/api/product', require('./product'))

module.exports = router