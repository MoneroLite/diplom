import React, { useState } from 'react'
import { Button } from 'antd';
import AdminDash from '../components/AdminPages/AdminDash'
import AdminFeedback from '../components/AdminPages/AdminFeedback';
import AdminPost from '../components/AdminPages/AdminPost';
import AdminCategory from '../components/AdminPages/AdminCategory';
import AdminUsers from '../components/AdminPages/AdminUsers';
import './Styles/Admin.css'
import AdminTags from '../components/AdminPages/AdminTags';

const Admin = () => {
  const [view, setView] = useState('dash');

  return (
    <div className="admin">
      <div className="admin__menu" style={{height: window.innerHeight - 54}}>
        <Button onClick={() => setView('dash')}>Дешборд</Button>
        <Button onClick={() => setView('feedback')}>Обратная связь</Button>
        <Button onClick={() => setView('post')}>Посты</Button>
        <Button onClick={() => setView('tags')}>Теги</Button>
        <Button onClick={() => setView('category')}>Категории</Button>
        <Button onClick={() => setView('users')}>Пользователи</Button>
      </div>

      <div className="admin__component">
        {view === 'dash' ? 
          <AdminDash/>
        : view === 'feedback' ?
          <AdminFeedback/>
        : view === 'post' ? 
          <AdminPost/>
          : view === 'tags' ? 
          <AdminTags/>
        : view === 'category' ?
          <AdminCategory/>
        : view === 'users' ?
          <AdminUsers/>
        :
          ''
        }
      </div>
    </div>
  )
}

export default Admin