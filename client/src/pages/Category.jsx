import { observer } from 'mobx-react-lite'
import React, {useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import PostList from '../components/PostList/PostList'
import { fetchOneCategory } from '../http/categoryAPI'
import { Spin, Button, Input } from 'antd';
import './Styles/Category.css'
import CreatePost from '../components/CreatePost/CreatePost'

const Category = observer(() => {
  const { Search } = Input;
  const {id} = useParams()
  const[loading, setLoading] = useState(true)
  const [category, setCategory] = useState()
  const [changeCategory, setChangeCategory] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const history = useNavigate()

  useEffect(() => {
    setChangeCategory(false)
    fetchOneCategory(id).then(data => setCategory(data)).finally(() => setLoading(false))
  }, [changeCategory])

  const onSearch = (search) => {
    fetchOneCategory(id, search).then(data => setCategory(data)).finally(() => setLoading(false))
  }
  if(loading) {
    return <div style={{weight: '100vh', height: window.innerHeight, background:'#272727', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Spin tip="Загрузка..." size="large"/>
            </div>
  }

  return (
    <div className="container">
      <p onClick={() => history(-1)} className="btn__back">назад</p>
      <div className="category__name">
        <div className="category__name-title">
        <img className="category__name-title__img" style={{width: '40px', height: '40px'}} alt="img" src={process.env.REACT_APP_API_URL + category.img}/>
          {category.title}
        </div>
        <div className="category__name-description">
        {category.description}
        </div>
      </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Search
            placeholder="Поиск"
            onSearch={onSearch}
            allowClear
            style={{
              width: 200,
            }}
          />
          <Button 
            className='category__btn'
            type="primary" 
            htmlType="submit"
            onClick={() => setIsModalVisible(true)}
          >
            Создать пост
          </Button>
        </div>
        <CreatePost changeCategory={setChangeCategory} category={category} visible={isModalVisible} onHide={() => setIsModalVisible(false)}/>
      <div className="category__">
      </div>
        <PostList posts = {category.posts}/>
    </div>
  )
})

export default Category