import { message } from 'antd'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PROFILE_ROUTE } from '../../utils/consts'
import DeleteBin from '../../assets/deleteBin.svg'
import { Context } from '../../index.js'
import { deleteComm } from '../../http/postAPI'

const CommentItem = ({changePost, comment}) => {
  const {user} = useContext(Context)
  console.log(user)
  const history = useNavigate()
  const errMessage = (e) =>{
    message.error(e)
  }

  const deleteComeent =  async (id) => {
    console.log(id)
    await deleteComm(id).then(() => changePost(true))
    message.success(`Комментарий удален`)
  }
    // console.log(comment.user.login)
  return (
    <div className="post__data-comment">
        <div className="post__data-comment__user">
            <p onClick={comment.user ? () => {history(PROFILE_ROUTE + '/' + comment.user.id)} : ()=> errMessage('Пользователь удален')} className="post__data-comment__user-login">{comment.user ? comment.user.login :'Удаленный пользователь'}</p>
            <img className="post__data-comment__user-avatar" src={comment.user ? process.env.REACT_APP_API_URL + comment.user.avatar : process.env.REACT_APP_API_URL + 'null.jpg'} alt='img'/>
        </div>
        <div className="post__data-comment__data">
            <div className="post__data-comment__data-text">{comment.text}</div>
            <div style={{display: 'flex', justifyContent: 'space-between'}} className="post__data-comment__data-bar">
              <div className="post__data-comment__date">{comment.date}</div>

              {user.user.role === 'ADMIN' ? 
                <img onClick={() => deleteComeent(comment.id)} style={{width: '17px', cursor: 'pointer'}} src={DeleteBin} alt="" /> :
                ''
              }
              
            </div>
        </div>
    </div>
  )
}

export default CommentItem