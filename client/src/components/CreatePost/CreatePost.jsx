import React, { useContext, useEffect, useState } from 'react'
import { Modal, Input, Checkbox, message } from 'antd';
import { Context } from '../../index';
import { createPost } from '../../http/postAPI';
import { fetchTags } from '../../http/tagAPI';

const CreatePost = ({changeCategory, visible, onHide, category}) => {

    const {user} = useContext(Context)

    const [tags, setTags] = useState([])

    const [title, setTitle] = useState('')
    const [quest, setQuest] = useState('')
    let tagList = []

    useEffect(() => { 
      fetchTags().then(data => setTags(data)).finally()
    }, [])

    // const showModal = () => {
    //     setIsModalVisible(true);
    //   };
    
      const handleOk = () => {
        if (!title || !quest){
          message.error('Заполните все поля')
        } else {
          const date = new Date();
        const formData = new FormData()

        formData.append('title', title)
        formData.append('question', quest)
        formData.append('date', `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`)
        formData.append('userId', Number(user.user.id))
        formData.append('categoryId', Number(category.id))
        formData.append('tags', tagList)
            
        createPost(formData).then(data => onHide())
        setTitle(''); setQuest(''); 

        changeCategory(true)
        }
      };
      
      const addTagFunc = (id) => {
        // console.log(id)
        let i = tagList.indexOf(id)
        if(i !== -1) {
          tagList.splice(i, 1)
        } else {
          tagList.push(id)
        }
        // tagy = JSON.stringify(tagList)
      }
    
    //   const handleCancel = () => {
    //     setIsModalVisible(false);
    //   };
      console.log(category)
  return (
    <div>
        <Modal width='50%' maskStyle={{background: "RGBA(0,0,0,0.7)",  backdropFilter: 'blur(5px)'}} title="Добавить пост" visible={visible} onOk={handleOk} onCancel={onHide}>
            <Input maxLength={255} placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input.TextArea value={quest} onChange={(e)=> setQuest(e.target.value)} showCount maxLength={255}  autoSize={{ minRows: 4, maxRows: 4 }} placeholder="Сообщение"  />
            <div className="modal__wrap-content">
              <p className="modal__wrap-content__text">Теги: </p>
              <div className="tags">
                {
                  tags.map(tag => 
                    <Checkbox onChange={() => addTagFunc(tag.id)} key={tag.id}>{tag.name}</Checkbox>
                  )
                }
              </div>
            </div>
        </Modal>
    </div>
  )
}

export default CreatePost