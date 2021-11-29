import { useState, useContext } from 'react'
import axios from 'axios'
import style from './write.module.css'
import { Context } from '../context/Context'

export default function Write() {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState(null)
    const { user } = useContext(Context)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const newPost = { 
            username: user.username,
            title, 
            desc 
        }
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)
            newPost.photo = filename
            try {
                await axios.post(`${process.env.REACT_APP_URL_API}/upload`, data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
          const result = await axios.post(`${process.env.REACT_APP_URL_API}/posts`, newPost)
          console.log(result) 
          window.location.replace("/post/" + result.data._id)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className={style.write}>
            {
                file && (
                    <img 
                        className={style.writeImg}
                        src={URL.createObjectURL(file)} 
                        alt="preview upload"
                    />
                ) 
            }
            <form className={style.writeForm} onSubmit={handleSubmit}>
                <div className={style.writeFormGroup}>
                    <label htmlFor="fileInput">
                    <i className={`${style.writeIcon} fas fa-plus`}></i>
                    </label>
                    <input type="file" className={style.writeInput} id="fileInput" style={{display: 'none'}}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input type="text" name="" className={style.writeInput} placeholder="Title" autoFocus={true}
                        onChange={(e)=> setTitle(e.target.value)}
                    />
                </div>
                <div className={style.writeFormGroup}>
                    <textarea 
                    placeholder="Tell your Story..."
                    type="text"
                    className={`${style.writeInput} ${style.writeText}`}
                    onChange={(e) => setDesc(e.target.value)}
                    >
                    </textarea>
                </div>
                <button className={style.writeSubmit} type="submit">Publish</button>
            </form>
        </div>
    )
}