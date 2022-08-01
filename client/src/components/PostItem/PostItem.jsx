// import { observer } from 'mobx-react-lite'
import React, {} from 'react'
import { useNavigate } from 'react-router-dom'
import { POST_ROUTE } from '../../utils/consts'
import { Avatar } from 'antd';
import TagList from './TagList';

const PostItem = ({post}) => {
    const history = useNavigate()
    // console.log(post.comments.length)
        return(
            <div className='posts' onClick={() => history(POST_ROUTE + '/' + post.id)}>

                {/* <div> idPost {post.id}, idCatPost {post.idCategory}, idPostUser {post.idUser}, {post.title}, {post.question}, date: {post.date}</div> */}
                <div className="posts__left">
                    <div className="posts__left-avatar">
                        <img style={{width:'100%'}} src={post.user ? process.env.REACT_APP_API_URL + post.user.avatar : process.env.REACT_APP_API_URL + 'null.jpg'} alt="img"/>
                    </div>
                    <div>
                        <div className="posts__left-title">{post.title}</div>
                        <div className="posts__left-info">{post.user ? post.user.login : 'Удаленный пользователь'}, {post.date}, Ответы: {post.comments.length}</div>
                        <div className="posts__left-tags">Теги: <TagList tag={post.tag_posts}/></div>
                    </div>
                    
                </div>
                {post.comments.length ? 
                <div className="posts__right">
                    <div className="posts__right-data">
                        <div className="posts__right-login">{post.comments[0].user ? post.comments[0].user.login : 'Удаленный пользователь'}</div>
                        <div className="posts__right-date">{post.comments[0].date}</div>
                    </div>
                    <div className="posts__right-avatar">
                        <img style={{width:'100%'}} src={post.comments[0].user ? process.env.REACT_APP_API_URL + post.comments[0].user.avatar : process.env.REACT_APP_API_URL + 'null.jpg'} alt="img"/>
                    </div>
                </div>
                    
                :
                <div className="posts__right-null">
                    <div className="posts__right-null__login">Ответов</div>
                    <div className="posts__right-null__date">Нет</div>
                </div>
                }
                
            </div>
            )
}

export default PostItem