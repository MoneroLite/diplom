import React, { useContext, useState } from 'react'
import { Modal, Input, Button } from 'antd';
import { Context } from '../index';
import { createComm } from '../http/postAPI';
import Send from '../assets/Send.svg'
import {SendOutlined} from '@ant-design/icons'

const CommentAdd = ({changePost, visible, onHide, post}) => {

    const [comm, setComm] = useState('')
    const{user} = useContext(Context)

    console.log(user.user)

    const handleOk = () => {
      const formData = new FormData()
        const date = new Date()

      formData.append('text', comm)
      formData.append('date', `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`)
      formData.append('userId', user.user.id)
      formData.append('postId', post.id)

        
      createComm(formData).then(data => onHide())
      setComm('')
      changePost(true)
    //   createPost(formData).then(data => onHide())
    };

  return (
    <div className='post__add'>
        <Input className='post__add-input' placeholder="Напишите ответ..." maxLength={255} value={comm} onChange={(e) => setComm(e.target.value)} />
        <Button className='post__add-btn' type="text" onClick={handleOk} icon={<SendOutlined />}></Button>
        {/* <Modal width='50%' maskStyle={{background: "RGBA(0,0,0,0.7)",  backdropFilter: 'blur(5px)'}} title="Добавить комментарий" visible={visible} onOk={handleOk} onCancel={onHide}>
            <Input maxLength={255} placeholder="Комментарий" value={comm} onChange={(e) => setComm(e.target.value)} />
        </Modal> */}

    </div>
  )
}

export default CommentAdd