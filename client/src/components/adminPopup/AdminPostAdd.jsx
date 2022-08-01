import React, { useContext, useEffect, useState } from 'react'
import { Modal, Input, Menu, Dropdown, Button, Spin } from 'antd';
import { fetchCategory } from '../../http/categoryAPI';
import { Context } from '../../index';
import { createPost } from '../../http/postAPI';


const AdminPostAdd = ({visible, onHide}) => {

    const {user} = useContext(Context)

    const [title, setTitle] = useState('')
    const [quest, setQuest] = useState('')
    const [loading, setLoading] = useState(true)
    const [categorys, setCategorys] = useState()
    const [selectedCategory, setSelectedCategory] = useState('')

    useEffect(() => {
        fetchCategory().then(data => setCategorys(data)).finally(() => setLoading(false))
    }, [])

    
    const handleOk = () => {
        const date = new Date();
        const formData = new FormData()

        formData.append('title', title)
        formData.append('question', quest)
        formData.append('date', `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`)
        formData.append('categoryId', Number(selectedCategory.id))
        formData.append('userId', Number(user.user.id))
    
        createPost(formData).then(data => onHide())
    };

    if(loading) {
        return <div style={{weight: '100vh', height: window.innerHeight, background:'#272727', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Spin tip="Загрузка..." size="large"/>
        </div>
    
      }

    //   console.log(categorys)

      const Category = (
        <Menu>
            {categorys.map(category => 
                <Menu.Item 
                    {...console.log(category)}
                    key={category.id}
                    onClick={() => setSelectedCategory(category)}
                >
                    {category.title}
                </Menu.Item>
                )}
        </Menu>
      )

      

  return (
    <div>
        <Modal width='50%' maskStyle={{background: "RGBA(0,0,0,0.7)",  backdropFilter: 'blur(5px)'}} title="Создать пост" visible={visible} onOk={handleOk} onCancel={onHide}>

            <div className="modal__wrap-content">
              <p className="modal__wrap-content__text">Заголовок: </p>
              <Input maxLength={255} placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="modal__wrap-content">
              <p className="modal__wrap-content__text">Вопрос: </p>
              <Input.TextArea value={quest} onChange={(e)=> setQuest(e.target.value)} showCount maxLength={255}  autoSize={{ minRows: 4, maxRows: 4 }} placeholder="Сообщение"  />
            </div>
            <div className="modal__wrap-content">
            <p className="modal__wrap-content__text">Выбор категории: </p>
              <Dropdown overlay={Category} placement="bottom" arrow>
                  <Button style={{width: '200px'}}> {selectedCategory.title || 'Категория'} </Button>
              </Dropdown>
            </div>
        </Modal>
    </div>
  )
}

export default AdminPostAdd