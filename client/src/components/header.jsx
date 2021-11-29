import style from './header.module.css'

export default function Header() {
    return(
        <div className={style.header}>
            <div className={style.headerTitle}>
                <span className={style.headerTitleSm}>React & Node</span>
                <span className={style.headerTitleLg}>Blog</span>
            </div>
            <img 
                className={style.headerImg} 
                src="https://images.unsplash.com/photo-1624731798627-6cea0017de7c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1031&q=80" 
                alt="hooh"
            />
        </div>
    )
}