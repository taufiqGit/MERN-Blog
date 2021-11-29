const router = require('express').Router()
const Category = require('../models/Category')

// Add Category
router.post("/", async (req, res)=>{
    const postCat = new Category(req.body)
    try {
        const savedCat = await postCat.save()
        res.status(201).json(savedCat)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Get Category
router.get("/", async (req, res)=>{
    try {
        const cats = await Category.find()
        res.status(200).json(cats)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router