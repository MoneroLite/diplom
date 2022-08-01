import React from 'react'
import AdminPostItem from './AdminPostItem'

const AdminPostList = ({changePost, post}) => {
    if (post.length) return (
        post.map(post => 
                    <AdminPostItem changePost={changePost} key={post.id} post={post} />
                )
        )
        return (
          <div className='no__post'>Тут пока нет постов</div>
        )
}

export default AdminPostList