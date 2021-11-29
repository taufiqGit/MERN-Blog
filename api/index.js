const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const multer = require('multer')
const path = require("path")
const cors = require('cors')
const app = express()

const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")

dotenv.config()
app.use(express.json())
app.use(cors())
app.use("/images", express.static(path.join(__dirname, "images")))

mongoose.connect(process.env.URI_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
})
.then(console.log('Connected to MongoDB'))
.catch(err => console.log(err))

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "images")
    }, 
    filename: (req, file, cb)=>{
        consol
        cb(null, req.body.name)
    }
})

const upload = multer({storage: storage})
app.post("/api/upload", upload.single("file"), (req, res)=>{
    res.status(201).json("file has been uploaded")
})

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/category', categoryRoute)

app.get('*', (req, res)=> res.status(404).send("404 Page Not Found"))

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> console.log("server is running"))