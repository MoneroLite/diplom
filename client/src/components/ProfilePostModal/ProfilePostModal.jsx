import React from 'react'
import { Modal } from 'antd';
import ProfilePostModalList from './ProfilePostModalList';
import { observer } from 'mobx-react-lite';


const ProfilePostModal = observer(({visible, onHide, profile}) => {
    console.log(profile.posts)
  return (
    <div>
    <Modal 
        width='50%' 
        maskStyle={{background: "RGBA(0,0,0,0.7)",  backdropFilter: 'blur(5px)'}} 
        title={"Посты пользователя: " + profile.login} 
        visible={visible}  
        onCancel={onHide}
        footer={null}
    >
        <ProfilePostModalList profile={profile}></ProfilePostModalList>
    </Modal>
</div>
  )
})

export default ProfilePostModal