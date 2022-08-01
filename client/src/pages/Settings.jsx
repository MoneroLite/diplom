import React, { useContext, useEffect, useState } from 'react'
import { Input, Cascader, Button, message } from 'antd';
import './Styles/Settings.css'
import { Context } from '../index';
import { fetchInfo, settingsUpdateImg, updateInfo, updatePassword } from '../http/settingsAPI';

const Settings = () => {
  const [changeInfo, setChangeInfo] = useState(false)
  const [info, setInfo] = useState({})
  const [oldPassword, setOldPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const[newImg, setNewImg] = useState()
  const {user} = useContext(Context)
  const id = user.user.id

  message.config({
    maxCount: 3,
  })

  useEffect(() => { 
    setChangeInfo(false)
    fetchInfo(id).then(data => setInfo((prevState) => ({...prevState, ...data})))
  }, [changeInfo])

  const submitInfoFunc = () => {
    updateInfo(info).then(data => console.log(data))
    setChangeInfo(true)
  }

  const changePasswordFunc = async () => {
    try {
      const formData = new FormData()
      formData.append('id', id)
      formData.append('oldPassword', oldPassword)
      formData.append('newPassword', newPassword)
      await updatePassword(formData)
      setOldPassword(''); setNewPassword('')
      message.success('Пароль успешно изменен')
    } catch (e){
      message.error(e.response.data.message)
    }
  }

  const changeImg =() => {
    if (!newImg){
      message.error('Выберете аватарку')
    } else {
      const formData = new FormData()
      formData.append('id', id)
      formData.append('avatar', newImg)
      settingsUpdateImg(formData).then(() =>  message.success('Аватарка изменена'))
    }
  }

  const options = [
    {
      value: 'Мужской',
      label: 'Мужской',
    },
    {
      value: 'Женский',
      label: 'Женский',
    },
    {
      value: 'не указано',
      label: 'не указано',
    },
  ];

  function onChangeSex(value) {
    setInfo((prevState) => ({...prevState, sex: value[0]}))
  }

  return (
    <div className='container'>
      <div className="settings__form">
      <div className="settings__form-item">
          <p className="settings__form-item__text">Изменить пароль:</p>
          <div className="settings__form-item__password">
            <Input.Password value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="settings__form-item__password-input settings__form-item__password-old" placeholder="Старый пароль" />
            <Input.Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="settings__form-item__password-input settings__form-item__password-new" placeholder="Новый пароль" />
            <Button onClick={() => changePasswordFunc()} className='settings__form-item__password-btn' type='primary'>Изменить пароль</Button>
          </div>
        </div>
        <div className="settings__form-item settings__form-item--minwth">
          <p className="settings__form-item__text">Изменить аватарку:</p>
          <div className="">
            <input onChange={(e) => setNewImg( e.target.files[0])} type='file'/>
            <Button onClick={() => changeImg()}type='primary'>Изменить аватарку</Button>
          </div>
        </div>
        <div className="settings__form-item settings__form-item--minwth">
          <p className="settings__form-item__text">Пол:</p>
          <Cascader value={info.sex} className="settings__form-item__inp" options={options} onChange={onChangeSex} defaultValue={['Не указано']} placeholder="Please select" />
        </div>
        <div className="settings__form-item">
          <p className="settings__form-item__text">Род занятий:</p>
          <Input value={info.job} onChange={(e) => setInfo((prevState) => ({...prevState, job: e.target.value}))} className="settings__form-item__inp" placeholder="Чем вы занимаетесь?" />
        </div>
        <div className="settings__form-item">
          <p className="settings__form-item__text">Адрес:</p>
          <Input value={info.addr} onChange={(e) => setInfo((prevState) => ({...prevState, addr: e.target.value}))} className="settings__form-item__inp" placeholder="Укажите ваш адрес" />
        </div>
        <div className="settings__form-item">
          <p className="settings__form-item__text">Вконтакте:</p>
          <Input value={info.vk} onChange={(e) => setInfo((prevState) => ({...prevState, vk: e.target.value}))} className="settings__form-item__inp" placeholder="Ссылка или id вашего аккаунта" />
        </div>
        <div className="settings__form-item">
          <p className="settings__form-item__text">Discord:</p>
          <Input value={info.ds} onChange={(e) => setInfo((prevState) => ({...prevState, ds: e.target.value}))} className="settings__form-item__inp" placeholder="Имя пользователя + id" />
        </div>
        <div className="settings__form-item">
          <p className="settings__form-item__text">Telegram:</p>
          <Input value={info.tg} onChange={(e) => setInfo((prevState) => ({...prevState, tg: e.target.value}))} className="settings__form-item__inp" placeholder="Ссылка или имя вашего аккаунта через @" />
        </div>
        <Button onClick={() => submitInfoFunc()} className='settings__form-btn__info' type='primary'>Сохранить изменения</Button>
      </div>
    </div>
  )
}

export default Settings