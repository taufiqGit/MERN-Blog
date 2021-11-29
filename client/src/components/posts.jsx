import style from './posts.module.css'
import Post from './post'

export default function Posts({ posts }) {
    return(
        <div className={style.posts}>
            {
                posts.map(p =>(
                    <Post key={p._id} post={p}/>
                ))
            }
        </div>
    )
}