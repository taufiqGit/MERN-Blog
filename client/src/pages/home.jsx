import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import axios from 'axios'
import style from './home.module.css'
import Header from '../components/header'
import Posts from '../components/posts'
import Sidebar from '../components/sidebar'

export default function Home() {
    const [posts, setPosts] = useState([])
    const { search } = useLocation()

    useEffect(()=>{
        const fetchPosts = async ()=>{
           const res = await axios.get(`${process.env.REACT_APP_URL_API}/posts` + search)
           setPosts(res.data)
        }
        fetchPosts()
    }, [search])

    return(
        <>
        <Header/>
        <div className={style.home}> 
            <Posts posts={posts}/>
            <Sidebar/>
        </div>
        </>
    )
}