import style from './post.module.css'
import { Link } from 'react-router-dom'

export default function Post({ post }) {
    const baseUrlImg = "http://localhost:5000/images/"
    return(
        <div className={style.post}>
            {
                post.photo && (
                    <img
                    className={style.postImg}
                    src={baseUrlImg + post.photo}
                    alt=""/>                    
                )
            }
            <div className={style.postInfo}>
                <div className={style.postCats}>
                    {
                        post.categories.map(c =>(
                            <span className={style.postCat}>{c.name}</span>
                        ))
                    }
                </div>
                <Link to={`/post/${post._id}`} className="link">
                    <span className={style.postTitle}>
                        {post.title}
                    </span>
                </Link>

                <hr/>
                <span className={style.postDate}>
                    {new Date(post.createdAt).toDateString()}
                </span>
            </div>
            <p className={style.postDesc}>
            {post.desc}  
            </p>
        </div>
    )
}