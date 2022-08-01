import React, { useContext, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd';
import 'antd/dist/antd.css';
import Logo from '../assets/Logo.svg'
import { FORUM_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import './Styles/Auth.css';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import {logIn, registration } from '../http/userAPI'

const Auth = observer(() => {
  const location = useLocation()
  const history = useNavigate()
  const {user} = useContext(Context)
  const isLogin = location.pathname === LOGIN_ROUTE
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  
  const sub = async () => {
    try {
        let data;
    if (isLogin) {
        data = await logIn(login, password)
        redirect()
    } 
    else {
        if(password === passwordConfirm) {
          data = await registration(login, password)
          redirect()
        }
        else {
          message.error('Пароли не совпадают');
        }
    }
    } catch (e) {
        message.error(e.response.data.message);
    }
  }
  const redirect = () => {
    user.setUser({})
    user.setUser(user)
    user.setIsAuth(true)
    history(FORUM_ROUTE)
    window.location.reload()
  }
  return (
    <div className="auth" 
      style={{height: window.innerHeight - 58}}
    >
      <div className='container'>
        <div className="auth__wrap">
          <img className='auth__wrap-img' src={Logo} alt="logo"/>
          <h2 className='auth__wrap-title'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
          <Form
            name="basic"
            className='auth__wrap-form'
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              name="login"
              className='auth__wrap-form__item'
              rules={[{ required: true, message: 'Введите логин!' }]}
            >
              <Input 
                value = {login}
                onChange={e => setLogin(e.target.value)}
                className='auth__wrap-form__item-login'
                placeholder="Логин" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              className='auth__wrap-form__item'
              rules={[{ required: true, message: 'Введите пароль!' }]}
            >
              <Input.Password 
                value = {password}
                onChange={e => setPassword(e.target.value)}
                className='auth__wrap-form__item-password'
                placeholder="Пароль"
              />
            </Form.Item>
              
            {isLogin? '':
              <Form.Item 
              name="passwordConfirm"
              className='auth__wrap-form__item'
              rules={[{ required: true, message: 'Введите пароль еще раз!' }]}
            >
              <Input.Password 
                value = {passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                className='auth__wrap-form__item-password'
                placeholder="Пароль еще раз"
              />
            </Form.Item>
            }

            <Form.Item 
              className='auth__wrap-form__item'
            >
              <Button 
                className='auth__wrap-form__item-submit'
                type="primary" 
                htmlType="submit"
                onClick={sub}
              >
                {isLogin ? 'Войти' : 'Создать аккаунт'}
                
              </Button>
            </Form.Item>
          </Form>

          {isLogin ?
            <p className = "auth__wrap-redir">Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегестрироваться</NavLink></p>
            : <p className = "auth__wrap-redir">Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink></p>
          }
          
        </div>
      </div>
    </div>
  )
})

export default Auth