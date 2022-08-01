import React, { useEffect, useState } from 'react'
import { Spin, Input } from 'antd';
import { fetchPost } from '../../http/postAPI';
import AdminPostList from './AdminPostList';

const AdminPost = () => {
    const { Search } = Input;
    const[post, setPost] = useState({})
    const[loading, setLoading] = useState(true)
    const [changePost, setChangePost] = useState(false)

  useEffect(() => {
    setChangePost(false)
    fetchPost(null).then(data => setPost(data)).finally(() => setLoading(false))
  }, [changePost])

  const onSearch = (search) => {
    fetchPost(search).then(data => setPost(data)).finally(() => setLoading(false))
  }

 console.log(post)
  if(loading) {
    return <div style={{weight: '100vh', height: window.innerHeight, background:'#272727', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Spin tip="Загрузка..." size="large"/>
    </div>
  } 
  return (
    <div className="admin__component-post">
        <h2 className="admin__component-title">Посты</h2>
        <div style={{textAlign: 'center', marginBottom: '10px'}}>
          <Search
            placeholder="Поиск"
            onSearch={onSearch}
            allowClear
            style={{
              width: 200,
            }}
          />
        </div>
        
        <div className="admin__component-post__list">
            <AdminPostList changePost={setChangePost} post={post}/>
        </div>
    </div>
  )
}

export default AdminPost