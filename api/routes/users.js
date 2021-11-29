const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')

router.put("/:id", async (req, res)=>{
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, 
            { new: true })
            const { password, ...others } = updateUser._doc
            res.status(200).json(others)
        } catch (error) {
            res.status(500).json(error)
        }        
    } else {
        res.status(400).json("you can update only your account")
    }
})

// UPDATE
router.delete("/:id", async (req, res)=>{
    if (req.body.userId === req.params.id) {
        const user = await User.findById(req.params.id)
        if (user) {
            try {
                await Post.deleteMany({username: req.body.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("user has been delete")
            } catch (error) {
                res.status(500).json(error)
            }             
        } else{
            res.status(404).json("user not found")
        }
    } else {
        res.status(401).json("you can delete only your account")
    }
})

//GET users
router.get("/:id", async (req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router