import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Spin } from 'antd';
import { fetchOneProfile } from '../http/profileAPI';
import { UnorderedListOutlined } from '@ant-design/icons';
import './Styles/Profile.css'
import ProfilePostModal from '../components/ProfilePostModal/ProfilePostModal';

const Profile = observer(() => {
  const history = useNavigate()
  const {id} = useParams()
  const[profile, setProfile] = useState({})
  const[loading, setLoading] = useState(true)
  const [PostModalVisible, setPostModalVisible] = useState(false);

  useEffect(() => {
    fetchOneProfile(id).then(data => setProfile(data)).finally(() => setLoading(false))
  }, [])

  if(loading) {
    return <div style={{weight: '100vh', height: window.innerHeight, background:'#272727', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Spin tip="Загрузка..." size="large"/>
    </div>
  } 
  console.log(profile)
  return (
    <div className='container'>
      <p onClick={() => history(-1)} className="btn__back">назад</p>
      <div className="profile">
        <div className='profile__user'>
          <p className='profile__user-role'>{profile.role}</p>
          <img className='profile__user-avatar' src={process.env.REACT_APP_API_URL + profile.avatar} alt='img'/>
        </div>
        <div className='profile__info'>
          <p className='profile__user-login'>{profile.login}</p>
          <p className='profile__user-sex'>Пол: <span>{profile.info[0].sex}</span></p>
          <p className='profile__user-job'>Род занятий: <span>{profile.info[0].job}</span></p>
          <p className='profile__user-addr'>Адрес: <span>{profile.info[0].addr}</span></p>
          <p className='profile__user-vk'>Вконтакте: <span>{profile.info[0].vk}</span></p>
          <p className='profile__user-ds'>Discord: <span>{profile.info[0].ds}</span></p>
          <p className='profile__user-tg'>Telegram: <span>{profile.info[0].tg}</span></p>
          <div className="profile__user-state">
            <p className="profile__user-state__text">Созданных постов: {profile.posts ? profile.posts.length : '0'} <span>|</span> Ответов: {profile.comments ? profile.comments.length: '0'} </p>
          </div>
          <Button onClick={() => setPostModalVisible(true)} className='profile__info-btn' icon={<UnorderedListOutlined />} type='text'>Посты {profile.login}</Button>
        </div>
      </div>
      <ProfilePostModal visible={PostModalVisible} profile={profile} onHide={() => setPostModalVisible(false)}/>
    </div>
  )
})

export default Profile