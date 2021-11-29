import { Link } from 'react-router-dom'
import { useContext } from 'react'
import style from './topbar.module.css'
import avatar from '../image/ava-default.jpg'
import { Context } from '../context/Context'

export default function TopBar() {
    const { user, dispatch } = useContext(Context)

    const handleLogout = ()=>{
        dispatch({ type: "LOGOUT" })
    }

    const urlImg = "http://localhost:5000/images/"

    return(
        <div className={style.top}>
            <div className={style.topLeft}>
                <i className={`${style.topIcon} fab fa-facebook-square`}></i>
                <i className={`${style.topIcon} fab fa-twitter-square`}></i>
                <i className={`${style.topIcon} fab fa-pinterest-square`}></i>
                <i className={`${style.topIcon} fab fa-instagram-square`}></i>
            </div>
            <div className={style.topCenter}>
                <ul className={style.topList}>
                    <li className={style.topListItem}>
                        <Link className="link" to="/">HOME</Link>
                    </li>
                    <li className={style.topListItem}>
                       <Link className="link" to="/write">WRITE</Link> 
                    </li>
                    <li className={style.topListItem} >ABOUT</li>
                    <li className={style.topListItem}>{user ? <span onClick={handleLogout}>LOGOUT</span> : ''}</li>
                </ul>
            </div>
            <div className={style.topRight}>
                {
                    user ? (
                        <Link className="link" to="/settings">
                            <img className={style.topImg} src={user.profilePic ? urlImg + user.profilePic : avatar} alt="s"/>
                        </Link>
                    ) : (
                        <ul className={style.topList}>
                            <li className={style.topListItem}>
                                <Link className="link" to="/register">REGISTER</Link> 
                            </li>
                            <li className={style.topListItem}>
                                <Link className="link" to="/login">LOGIN</Link> 
                            </li>                             
                        </ul>
                    )
                }
                
                <i className={`${style.topSearchIcon} fas fa-search`}></i>
            </div>
        </div>
    )
}