import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import style from './sidebar.module.css'
import imgSidebar from '../image/pussy.png'
import axios from 'axios'

export default function Sidebar() {
    const [cats, setCats] = useState([])

    useEffect(()=>{
        const getCats = async ()=>{
            const result = await axios.get(`${process.env.REACT_APP_URL_API}/category`)
            setCats(result.data)
        }
        getCats()
    }, [])

    return(
        <div className={style.sidebar}>
            <div className={style.sidebarItem}>
                <span className={style.sidebarTitle}>About Me</span>
                <img className={style.sidebarImg} src={imgSidebar} alt="me"/>
                <p className={style.sidebarParagraph}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div className={style.sidebarItem}>
             <span className={style.sidebarTitle}>CATEGORIES</span>
             <ul className={style.sidebarList}>
                 {
                     cats.map(cat => (
                        <Link key={cat._id} className="link" to={`/?category=${cat.name}`}>
                            <li className={style.sidebarListItem}>{cat.name}</li>
                        </Link>
                     ))
                 }
             </ul>
            </div>
            <div className={style.sidebarItem}>
            <span className={style.sidebarTitle}>FOLLOW US</span>
            <div className={style.sidebarSocial}>
                <i className={`${style.sidebarIcon} fab fa-facebook-square`}></i>
                <i className={`${style.sidebarIcon} fab fa-twitter-square`}></i>
                <i className={`${style.sidebarIcon} fab fa-pinterest-square`}></i>
                <i className={`${style.sidebarIcon} fab fa-instagram-square`}></i>
            </div>
            </div>
        </div>
    )
}