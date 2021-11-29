import Sidebar from "../components/sidebar"
import SinglePost from "../components/singlePost"
import style from './single.module.css'

export default function Single(params) {

    return(
        <div className={style.single}>
            <SinglePost/>
            <Sidebar/>
        </div>
    )
}