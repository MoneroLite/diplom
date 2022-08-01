import React from 'react'
import { useNavigate } from 'react-router-dom'
import { POST_ROUTE } from '../../utils/consts'

const ProfilePostModalItem = ({post}) => {
    const history = useNavigate()
  return (
    <div className='posts' onClick={() => history(POST_ROUTE + '/' + post.id)}>

                {/* <div> idPost {post.id}, idCatPost {post.idCategory}, idPostUser {post.idUser}, {post.title}, {post.question}, date: {post.date}</div> */}
                <div className="posts__left">
                    {/* <div className="posts__left-avatar">
                        <img style={{width:'100%'}} src={process.env.REACT_APP_API_URL + post.user.avatar} alt="img"/>
                    </div> */}
                    <div>
                        <div className="posts__left-title">{post.title}</div>
                        <div className="posts__left-info"> {post.date}</div>
                    </div>
                </div>
                
                
    </div>
  )
}

export default ProfilePostModalItem