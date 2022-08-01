import React, { useEffect, useState } from 'react'
import { fetchCategory, updateCategory, updateCategoryImg } from '../../http/categoryAPI'
import { Spin, Button, Modal, Input } from 'antd';
import AdminCategoryList from './AdminCategoryList';
import AdminCategoryAdd from '../adminPopup/adminCategory/AdminCategoryAdd';

const AdminCategory = () => {
    const { Search } = Input;
    const[category, setCategory] = useState({})
    const[loading, setLoading] = useState(true)
    const[isCategoryModalVisible, setIsCategorModalVisible] = useState(false);
    const[isCategoryModalUpdate, setIsCategorModalUpdate] = useState(false);
    const[oneCategory, setOneCategory] = useState({})
    const[newImg, setNewImg] = useState()
    const[changeCategory, setChangeCategory] = useState(false)

  useEffect(() => {
    setChangeCategory(false)
    fetchCategory().then(data => setCategory(data)).finally(() => setLoading(false))
  }, [changeCategory])

  const onSearch = (search) => {
    fetchCategory(search).then(data => setCategory(data)).finally(() => setLoading(false))
  }

  const selectFile = e => {
    setNewImg(e.target.files[0])
  }
  
  const updateCategoryFunc = () => {
    console.log(oneCategory)
    if(!newImg){
      const formData = new FormData()
      formData.append('id', oneCategory.id)
      formData.append('title', oneCategory.title)
      formData.append('description', oneCategory.description)
      updateCategory(formData).then(() => setIsCategorModalUpdate(false))
    } else {
      const formData = new FormData()
      formData.append('id', oneCategory.id)
      formData.append('title', oneCategory.title)
      formData.append('description', oneCategory.description)
      formData.append('img', newImg)
      updateCategoryImg(formData).then(() => setIsCategorModalUpdate(false))
    }
    setChangeCategory(true)
  }

  if(loading) {
    return <div style={{weight: '100vh', height: window.innerHeight, background:'#272727', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Spin tip="Загрузка..." size="large"/>
    </div>
  }
  return (
    <div className="admin__component-category">
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
            onClick={() => setIsCategorModalVisible(true)}
          >
            Добавить категорию
          </Button>
        </div>
        <AdminCategoryList setCategory={setOneCategory} setModalUpdate={setIsCategorModalUpdate} setChangeCategory={setChangeCategory} category={category}/>
      </div>
      <AdminCategoryAdd setChangeCategory={setChangeCategory} visible={isCategoryModalVisible} onHide={() => setIsCategorModalVisible(false)}/>
      <Modal width='50%' maskStyle={{background: "RGBA(0,0,0,0.7)",  backdropFilter: 'blur(5px)'}} title="Изменить категорию" visible={isCategoryModalUpdate} onOk={updateCategoryFunc} onCancel={() => setIsCategorModalUpdate(false)}>
      <div className="modal__wrap-content">
        <p className="modal__wrap-content__text">Заголовок: </p>
        <Input value={oneCategory.title} onChange={(e) => setOneCategory((prevState) => ({...prevState, title: e.target.value}))} placeholder="Заголовок" />
      </div>
      <div className="modal__wrap-content">
              <p className="modal__wrap-content__text">Описание: </p>
        <Input value={oneCategory.description} onChange={(e) => setOneCategory((prevState) => ({...prevState, description: e.target.value}))} placeholder="Описание" />
      </div>
        <div className="modal__wrap-content">
              <p className="modal__wrap-content__text">Изображение: </p>
        <input onChange={selectFile} type='file'/>
        </div>
      </Modal>
    </div>
  )
}

export default AdminCategory