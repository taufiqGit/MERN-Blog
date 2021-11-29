import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import axios from 'axios'
import style from './singlePost.module.css'
import { Context } from '../context/Context'

export default function SinglePost() {
    const baseUrlImg = "http://localhost:5000/images/"
    const { user } = useContext(Context)
    const location = useLocation()
    const path = location.pathname.split('/')[2]
    const [post, setPost] = useState({})
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [updateMode, setUpdateMode] = useState(false)
    
    useEffect(()=>{
        const getPost = async()=>{
            const result = await axios.get(`${process.env.REACT_APP_URL_API}/posts/${path}`)
            setPost(result.data)
        }
        getPost()
    }, [path])

    const handleDelete = async()=>{
        try {
            await axios.delete(`${process.env.REACT_APP_URL_API}/posts/` + path, {data: { username: user.username }})
            window.location.replace("/")            
        } catch (error) {
            
        }
    }

    const handleUpdate = async()=>{
        try {
            const result = await axios.put(`${process.env.REACT_APP_URL_API}/posts/` + post._id, {
                username: user.username,
                title,
                desc
            })
            setUpdateMode(false)
            setPost(result.data)
        } catch (error) {
            
        }
    }

    console.log(post.username, user.username)
    return(
        <div className={style.singlePost}>
            <div className={style.singlePostWrapper}>
                {
                    post.photo && (
                        <img 
                            src={baseUrlImg + post.photo}
                            alt="d"
                            className={style.singlePostImage}
                        />                        
                    )
                }
                {
                    updateMode ? <input type="text" className={style.editTitle} onChange={(e)=> setTitle(e.target.value)} value={title}/> : (
                        <h1 className={style.singlePostTitle}>
                        {post.title}
                        {
                            post.username === user.username && (
                              <div className={style.singlePostEdit}>
                                <i className={`${style.singlePostIcon} fas fa-edit`} onClick={()=> setUpdateMode(true)}></i>
                                <i className={`${style.singlePostIcon} fas fa-trash-alt`} onClick={handleDelete}></i>
                              </div>
                            )
                        }
                        </h1>                       
                    )
                }
                <div className={style.singlePostInfo}>
                    <span className={style.singlePostAuthor}>
                        Author : 
                        <Link className="link" to={`/?user=${post.username}`}>
                            <b> {post.username}</b>
                        </Link>
                    </span>
                    <span className={style.singlePostDate}>
                        { new Date(post.createdAt).toDateString() }
                    </span>
                </div>
                {
                    updateMode ? <textarea className={style.editDesc} onChange={(e)=> setDesc(e.target.value)} value={desc}/> : (
                        <p className={style.singlePostDesc}>
                        {post.desc}
                        </p>                        
                    )
                }
                {
                    updateMode && (
                        <button onClick={handleUpdate} className={style.btnUpdatePost}>
                            Update
                        </button>
                    )
                }
            </div>
        </div>
    )
}