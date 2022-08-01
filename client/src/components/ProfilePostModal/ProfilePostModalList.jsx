import React from 'react'
import ProfilePostModalItem from './ProfilePostModalItem'

const ProfilePostModalList = ({profile}) => {
    if (profile.posts.length) return (
        profile.posts.map(post => 
                    <ProfilePostModalItem  key={post.id} post={post} />
                    )
        )
        
        return (
          <div className='no__post'>Тут пока нет постов</div>
        )
}

export default ProfilePostModalList