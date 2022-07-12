const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken');
const Auth = require('../modal/authSchema')

const registerAuth = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) return res.status(404).json({ message: "Require fields are empty" })

    let hash = await bcrypt.hash(password, 10)

    try {
        const emailFind = await Auth.findOne({ email: email })
        if (emailFind) return res.status(404).json({ message: "User already registerd" })

        const newUser = new Auth({
            username, password: hash, email
        })
        await newUser.save()

        res.status(200).json(newUser)
    } catch (error) {
        res.status(404).status({ message: error.message })
    }
}

const loginAuth = async (req, res) => {
    const { email } = req.body
    const passwords = String(req.body.password)
    try {
        const loginUser = await Auth.findOne({ email })
        if (!loginUser) return res.status(404).json({ message: "User not found" })

        const ispasswordCorrect = await bcrypt.compare(passwords, loginUser.password)
        if (!ispasswordCorrect) return res.status(404).json({ message: "Inncorrect password" })

        const token = JWT.sign({ id: loginUser._id, isAdmin: loginUser.isAdmin },
            "FinalProjectOnMernStack")
        const { password, ...other } = loginUser._doc

        res.status(200).json({...other, token })


    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

module.exports = {
    registerAuth,
    loginAuth
}