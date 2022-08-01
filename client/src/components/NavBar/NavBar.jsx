import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ADMIN_ROUTE, FAVORIT_ROUTE, FEEDBACK_ROUTE, FORUM_ROUTE, HELP_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SETTINGS_ROUTE, STATUS_ROUTE } from '../../utils/consts'
import Logo from '../../assets/Logo.svg'
import '../../Container.css'
import './NavBar.css'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import { Menu, Dropdown, Button, Space } from 'antd';


const NavBar = observer(() => {
    
    const {user} = useContext(Context)
    const history = useNavigate()

    const menu = (
        <Menu className="drop__menu">
            <Menu.Item key='0'>
                <Button className="drop__menu-btn" type="text" onClick={() => history(PROFILE_ROUTE+ '/' + user.user.id)}>Мой профиль</Button>
            </Menu.Item>
            <Menu.Item key='1'>
                <Button className="drop__menu-btn" type="text" onClick={() => history(SETTINGS_ROUTE)}>Настройки профиля</Button>
            </Menu.Item>
            <Menu.Item key='2'>
                <Button className="drop__menu-btn" type="text" onClick={() => history(FAVORIT_ROUTE)}>Избранное</Button>
            </Menu.Item>
            <Menu.Item key='3'>
                <Button className="drop__menu-btn" type="text" onClick={() => logOut()}>Выйти</Button>
            </Menu.Item>

            {user.user.role === 'ADMIN' ?
                <Menu.Item key='4'>
                <Button className="drop__menu-btn" type="text" onClick={() => history(ADMIN_ROUTE)}>Админ-панель</Button>
            </Menu.Item>
            :''}

        </Menu>
      )

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        window.location.reload()
    }

        
    

  return (
    <header className='header'>
        <div className="container">
            {user.isAuth ?
            // если авторизован
                <div className="navbar">
                    <div className='navbar__logo'>
                        <NavLink to={FORUM_ROUTE}>
                            <img className='navbar__logo-img' src={Logo} alt="logo"/>
                        </NavLink>
                    </div>
                    <div className='navbar__menu'>
                        <NavLink to={FORUM_ROUTE} className='navbar__menu-item'>Форум</NavLink>
                        <NavLink to={HELP_ROUTE} className='navbar__menu-item'>Справка</NavLink>
                        <NavLink to={FEEDBACK_ROUTE} className='navbar__menu-item'>Обратная связь</NavLink>
                        <NavLink to={STATUS_ROUTE} className='navbar__menu-item'>Пожертвование</NavLink>
                    </div>
                    <div className='navbar__auth'>
                        
                    <Dropdown overlay={menu} placement="bottom">
                    <Space>
                        <div className='drop'>
                            <img className='drop__img' src={process.env.REACT_APP_API_URL + user.user.avatar} alt='img'/>
                            <p className='drop__login'>{user.user.login}</p>
                        </div>
                        
                    </Space>
                    </Dropdown>
                         {/* <button className='navbar__auth-login' onClick={() => history(ADMIN_ROUTE)}>Админ-панель</button>  */}
                         {/* <button className='navbar__auth-registration' onClick={() => logOut()}>Выйти</button> */} 
                    </div>
                </div>
            :
            // если не авторизован
                <div className="navbar">
                    <div className='navbar__logo'>
                        <NavLink to={FORUM_ROUTE}>
                            <img className='navbar__logo-img' src={Logo} alt="logo"/>
                        </NavLink>
                    </div>
                    <div className='navbar__menu'>
                        <NavLink to={FORUM_ROUTE} className='navbar__menu-item'>Форум</NavLink>
                        <NavLink to={HELP_ROUTE} className='navbar__menu-item'>Справка</NavLink>
                        <NavLink to={FEEDBACK_ROUTE} className='navbar__menu-item'>Обратная связь</NavLink>
                        {/* <NavLink to={STATUS_ROUTE} className='navbar__menu-item'>Статус</NavLink> */}
                    </div>
                    <div className='navbar__auth'>
                        <button className='navbar__auth-login' onClick={() => history(LOGIN_ROUTE)}>Войти</button>
                        <button className='navbar__auth-registration' onClick={() => history(REGISTRATION_ROUTE)}>Создать аккаунт</button>
                    </div>
                </div>
            }
            
            
        </div>
    </header>
    )
})

export default NavBar