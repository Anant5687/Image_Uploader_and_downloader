const Product = require('../modal/productSchema')
const Auth = require('../modal/authSchema')
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dbdtk77uc',
    api_key: "863992813938763",
    api_secret: 'CN6B_iWE_BXmRbeAX7tAXMJVFYc',
    secure: true
});

const postingProducts = async (req, res) => {
    const { userId } = req.params
    const valueG = Math.floor((Math.random() * 1000000) + 1);
    const imageFile = req.files.file.path
    cloudinary.uploader.upload(imageFile, async function (error, result) {
        if (error) {
        } else {
            const newProduct = await Auth.findByIdAndUpdate(userId, {
                $push: { data: { img: result.url, value: valueG } },
            }, { new: true })

            res.status(201).json(newProduct)
        }
    })
}

const getAllProducts = async (req, res) => {
    const { userId } = req.params
    try {
        const allProduct = await Auth.findOne({ _id: userId })
        res.status(200).json(allProduct)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


const RemoveAllMemo = async (req, res) => {

    const { userId } = req.params

    try {
        try {

            const getItem = await Auth.findByIdAndUpdate(userId, {
                $pull: { data: { Object } }
            }, { new: true })

            res.status(201).json(getItem)

        } catch (error) {
            res.status(404).json({ message: message.error })
        }

    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports = {
    getAllProducts,
    postingProducts,
    RemoveAllMemo
}