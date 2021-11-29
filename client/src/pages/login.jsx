import { Link } from 'react-router-dom'
import { useRef, useContext } from 'react'
import axios from 'axios'
import style from './login.module.css'
import { Context } from '../context/Context'

export default function Login(params) {
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const { dispatch, isFetching, user } = useContext(Context)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        //console.log(usernameRef.current.value, passwordRef.current.value)
        dispatch({type: "LOGIN_START"})
        try {
            const result = await axios.post(`${process.env.REACT_APP_URL_API}/auth/login`, {
                username: usernameRef.current.value,
                password: passwordRef.current.value
            })
            //console.log(result)
            dispatch({type: "LOGIN_SUCCESS", payload: result.data})
        } catch (error) {
            dispatch({type: "LOGIN_FAILURE"})
        }
    }

    console.log(user)
    return(
        <div className={style.login}>
            <span className={style.titleLogin}>Login</span>
            <form className={style.loginForm} onSubmit={handleSubmit}>
                <label className={style.label}>Username</label>
                <input className={style.input} ref={usernameRef} type="text" placeholder="Enter Your Username.."/>
                <label className={style.label}>Password</label>
                <input className={style.input} ref={passwordRef} type="password" placeholder="Enter Your Password.."/>
                <button className={style.loginButton} type="submit" disabled={isFetching}>Login</button>
            </form>
            <button className={style.buttonToRegister}>
               <Link className="link" to="/register">Register</Link> 
            </button>
        </div>
    )
}