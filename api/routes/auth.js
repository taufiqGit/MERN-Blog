const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

// Register
router.post('/register', async (req, res)=>{
    console.log(req.body)
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })

        const user = await newUser.save()
        console.log(user)
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}) 

// Login 
router.post('/login', async (req, res)=>{
    try {
        const user = await User.findOne({username: req.body.username})
        !user && res.status(400).json("wrong credential")

        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json("wrong credential")
        console.log(user)
        const { password, ...onther } = user._doc
        res.status(200).json(onther)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
