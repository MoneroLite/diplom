import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchOnePost } from '../http/postAPI'
import { Spin, Button, message } from 'antd';
import { observer } from 'mobx-react-lite';
import CommentList from '../components/CommentList/CommentList';
import './Styles/Post.css'
import CommentAdd from '../components/CommentAdd';
import { PROFILE_ROUTE } from '../utils/consts';
import TagListPost from '../components/TagListPost';
import { Context } from '../index';
import { changeFavorit, checkFavorit } from '../http/favoritAPI';

const Post = observer(() => {
  const {id} = useParams()
  const {user} = useContext(Context)
  const userId = user.user.id
  const history = useNavigate()
  const [post, setPost] = useState({})
  const [changePost, setChangePost] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFavorit, setIsFavorit] = useState(false)
  
  useEffect(() => {
    setChangePost(false)
    fetchOnePost(id).then(data => setPost(data)).finally(() => setLoading(false))
    checkFavorit(id, userId).then(data => setIsFavorit(data))
  }, [changePost])

  const errMessage = (e) =>{
    message.error(e)
  }

  const changeFavoritFunc = () => {
    changeFavorit(id, userId).then()
    setChangePost(true)
  }

  if(loading) {
    return <div style={{weight: '100vh', height: window.innerHeight, background:'#272727', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Spin tip="Загрузка..." size="large"/>
    </div>
  } 

    return (
      <div className="container">
        <p onClick={() => history(-1)} className="btn__back">назад</p>
        <div className="post__title">
          <div className="">{post.title}</div>
          <Button onClick={() => changeFavoritFunc() }className="">{isFavorit? 'Удалить из избранного' : 'Добавить в избранное' }</Button> 
        </div>
        <div className="post__tags">
          Теги: <TagListPost tags={post.tag_posts}/>
        </div>
        <div className="post__data">
          <div className="post__data-user">
            <p onClick={post.user ? () => {history(PROFILE_ROUTE + '/' + post.user.id)} :() => {errMessage('Пользователь удален')}} className="post__data-user__login">{post.user ? post.user.login : 'Удаленный пользователь'}</p>
            <img className="post__data-user__avatar" src={post.user ? process.env.REACT_APP_API_URL + post.user.avatar : process.env.REACT_APP_API_URL + 'null.jpg'} alt="img"/>
          </div>
          <div className="post__data-question">
            <div className="post__data-question__text">{post.question}</div>
            <div className="post__data-question__date">{post.date}</div>
          </div>
        </div> 
        {post.comments.length ? 
          <h3 className="post__answer">Ответы</h3> : 
          <h3 className="post__answer">Ответов пока нет</h3>}
          <CommentList changePost={setChangePost} post={post}/>
          <CommentAdd changePost={setChangePost} post={post} visible={isModalVisible} onHide={() => setIsModalVisible(false)}/>
      </div>
    )
})

export default Post