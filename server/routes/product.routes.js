const express = require('express')
const { postingProducts, getAllProducts, RemoveAllMemo } = require('../controller/upload.controller')
const productRouter = express.Router()
const multipart = require('connect-multiparty')
const path = require('path')
const multiPartyMiddleWare = multipart({ uploadDir: path.join(__dirname, "uploads") })

productRouter.post('/:userId/post', multiPartyMiddleWare, postingProducts)

productRouter.get('/get/:userId', getAllProducts)

productRouter.delete('/delete/:userId', RemoveAllMemo)


module.exports = productRouter