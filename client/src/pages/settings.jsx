import { useContext, useState } from 'react'
import avatar from '../image/ava-default.jpg'
import style from './settings.module.css'
import Sidebar from '../components/sidebar'
import { Context } from '../context/Context'
import axios from 'axios'

export default function Settings() {
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)
    const { user, dispatch } = useContext(Context)
    const PF = "http://localhost:5000/images/"

    const handleSubmit = async(e)=>{
        e.preventDefault()
        dispatch({ type: "UPDATE_START" })
        const updateUser = {
            userId: user._id,
            username,
            email,
            password
        }
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)
            updateUser.profilePic = filename
            try {
                await axios.post(`${process.env.REACT_APP_URL_API}/upload`, data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
            const result = await axios.put(`${process.env.REACT_APP_URL_API}/users/` + user._id, updateUser)
            //console.log(updateUser)
            setSuccess(true)
            dispatch({ type: "UPDATE_SUCCESS", payload: result.data })
        } catch (error) {
            dispatch({ type: "UPDATE_FAILURE" })
        }
    }
    return(
        <div className={style.settings}>
            <div className={style.settingsWrapper}>
                <div className={style.settingsTitle}>
                    <span className={style.settingsUpdateTitle}>Update Your Account</span>
                    <span className={style.settingsDeleteTitle}>Delete Account</span>
                </div>
                <form className={style.settingsForm} onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className={style.settingsPP}>
                        <img 
                            className={style.PPImg}
                            src={file ? URL.createObjectURL(file) : user.profilePic ? PF + user.profilePic : avatar}
                            alt="ava image"
                        />
                        <label htmlFor="fileInput">
                            <i className={`${style.settingsPPIcon} far fa-user-circle`}></i>
                            <input type="file" id="fileInput" style={{display: 'none'}} onChange={(e) => setFile(e.target.files[0])}/>
                        </label>
                    </div>
                    <label className={style.label}>Username</label>
                    <input className={style.input} type="text" placeholder={user.username}
                        onChange={(e)=> setUsername(e.target.value)}
                    />
                    <label className={style.label}>Email</label>
                    <input className={style.input} type="email" placeholder={user.email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                    <label className={style.label}>Password</label>
                    <input className={style.input} type="password" placeholder="Password"
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                    <button className={style.settingsSubmit} type="submit">Update</button>
                    {success && (
                        <span
                        style={{ color: "green", textAlign: "center", marginTop: "20px" }}
                        >
                        Profile has been updated...
                        </span>
                    )}                
                </form>
            </div>
            <Sidebar/>
        </div>
    )
}