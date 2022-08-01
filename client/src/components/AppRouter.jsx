import React, { useContext } from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import { Context } from '../index'
import { adminRoutes, authRoutes, publicRoutes } from '../routes'
import { FORUM_ROUTE } from '../utils/consts'

const AppRouter = () => {
  const {user} = useContext(Context)
  const {category} = useContext(Context)
  const {post} = useContext(Context)
  console.log(user)
  console.log(category)
  console.log(post)
    
  return (
    <Routes>
        {/* для авторизированных пользователей */}
        {user.isAuth && authRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component/>} exact/>
        )}
        {user.user.role === 'ADMIN' && adminRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component/>} exact/>
        )}

        {/* для неавторизированных */}
        {publicRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component/>} exact/>
        )}

        {/* Если никакой маршрут не отработал, то нас перекидывает на FORUM_ROUTE  */}
        <Route path='*' element={<Navigate to={FORUM_ROUTE}/>}/>
    </Routes>
  )
}

export default AppRouter