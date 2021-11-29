const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')

// Add Post
router.post("/", async (req, res)=>{
    const newPost = new Post(req.body)
    try {
        const savePost = await newPost.save()
        res.status(201).json(savePost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Update Post
router.put("/:id", async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {
                const updatePost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                },
                { new: true })
                res.status(200).json(updatePost)
            } catch (error) {
                res.status(500).json(error)
            }                
        } else{
            res.status(401).json("you can update only your post!")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// Delete Post
router.delete("/:id", async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {
                await Post.deleteOne({ _id: req.params.id })
                res.status(200).json("Post has been delete")
            } catch (error) {
                res.status(500).json(error)
            }                
        } else{
            res.status(401).json("you can update only your post!")
        }
    } catch (error) {
        res.status(500).json(error)
    }    
})

// Get Post By ID
router.get("/:id", async (req, res)=>{
    try {
        const post = await Post.findById({ _id: req.params.id })
        //console.log(post)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Get all Posts
router.get("/", async (req, res)=>{
    const { user, category } = req.query
    try {
        let posts

        if (user) {
            posts = await Post.find({ username: user })
        } else if(category){
            posts = await Post.find({ categories: {
                $in: [category]
            }})
        } else{
            posts = await Post.find()
        }

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router