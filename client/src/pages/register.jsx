import { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './register.module.css'
import axios from 'axios'

export default function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = async(e)=>{
        e.preventDefault()
            setError(false)
        try {
            const result = await axios.post(`${process.env.REACT_APP_URL_API}/auth/register`, {
                username,
                email,
                password
            })            
            console.log(result)
            result.data && window.location.replace('/login')
        } catch (error) {
            setError(true)
        }
    }

    return(
        <div className={style.register}>
            <span className={style.titleRegister}>Register</span>
            <form className={style.registerForm} onSubmit={handleSubmit}>
                <label className={style.label}>Username</label>
                <input 
                 className={style.input} 
                 type="text" 
                 placeholder="Enter Your Username.."
                 onChange={(e)=> setUsername(e.target.value)}
                />
                <label className={style.label}>Email</label>
                <input 
                 className={style.input}
                 type="text" 
                 placeholder="Enter Your Email.."
                 onChange={(e)=> setEmail(e.target.value)}
                />
                <label className={style.label}>Password</label>
                <input
                  className={style.input}
                  type="password"
                  placeholder="Enter Your Password.."
                  onChange={(e)=> setPassword(e.target.value)}
                />
                <button className={style.registerButton} type="submit">Register</button>
            </form>
            <button className={style.buttonToLogin}>
               <Link className="link" to="/login">Login</Link> 
            </button>
            {error && <span style={{color: 'red', marginTop: '10px'}}>Something went wrong!</span>}
        </div>
    )
}