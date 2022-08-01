import React, { useEffect, useState } from 'react'
import { Spin, Button, Modal, Input, message } from 'antd';
import { createTag, fetchTags } from '../../http/tagAPI';
import AdminTagsList from './AdminTagsList';

const AdminTags = () => {
  const { Search } = Input;
  const [tags, setTags] = useState()
  const [loading, setLoading] = useState(true)
  const [changeTags, setChangeTags] = useState(false)
  const [isTagModalAdd, setIsTagModalAdd] = useState(false)
  const [tegNameAdd, setTegNameAdd] = useState()

  useEffect(() => { 
    setChangeTags(false)
    fetchTags(null).then(data => setTags(data)).finally(() => setLoading(false))
  }, [changeTags])

  const AddTagFunc = () => {
    if(!tegNameAdd){
      message.error('Заполните все поля')
    } else {
      const formData = new FormData()
      formData.append('name', tegNameAdd)
      createTag(formData).then(data => setChangeTags(true))
      message.success('тег добавлен')
      setTegNameAdd('')
      setIsTagModalAdd(false)
    }
  }

  const onSearch = (search) => {
    fetchTags(search).then(data => setTags(data)).finally(() => setLoading(false))
  }

  if(loading) {
    return <div style={{weight: '100vh', height: window.innerHeight, background:'#272727', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Spin tip="Загрузка..." size="large"/>
    </div>
  } 
  return (
    <div className="admin__component-tag">
      <h2 className="admin__component-title">Категории</h2>
      <div className="admin__component-category__list">
        <div style={{display: 'flex', justifyContent: 'space-between', width: '1140px', margin: '0 auto'}}>
          <Search
            placeholder="Поиск"
            onSearch={onSearch}
            allowClear
            style={{
              width: 200,
            }}
          />
          <Button
            className='admin__component-category__addbtn'
            type="primary" 
            htmlType="submit"
            onClick={() => setIsTagModalAdd(true)}
          >
            Добавить тег
          </Button>
        </div>
        <Modal width='50%' maskStyle={{background: "RGBA(0,0,0,0.7)",  backdropFilter: 'blur(5px)'}} title="Добавить тег" visible={isTagModalAdd} onOk={AddTagFunc} onCancel={() => setIsTagModalAdd(false)}>
          <div className="modal__wrap-content">
            <p className="modal__wrap-content__text">Название тега: </p>
            <Input value={tegNameAdd} onChange={(e) => setTegNameAdd(e.target.value)} placeholder="Название тега" />
          </div>
        </Modal>
      </div>
      <AdminTagsList setChangeTags={setChangeTags} tags={tags}/>
    </div>
  )
}

export default AdminTags