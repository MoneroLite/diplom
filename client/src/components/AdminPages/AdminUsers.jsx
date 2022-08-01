import React, { useEffect, useState } from 'react'
import { fetchUsers } from '../../http/userAPI'
import { Spin, Input } from 'antd';
import AdminUsersList from './AdminUsersList';
import AdminUserUpdate from '../adminPopup/adminUsers/AdminUserUpdate';


const AdminUsers = () => {
    const { Search } = Input;
    const[users, setUsers] = useState({})
    const[loading, setLoading] = useState(true)
    const[isUserModalUpdate, setIsUserModalUpdate] = useState(false)
    const[selectedUser, setSelectedUser] = useState()
    const [changeUser, setChangeUser] = useState(false)
    
  useEffect(() => {
    setChangeUser(false)
    fetchUsers(null).then(data => setUsers(data)).finally(() => setLoading(false))
  }, [changeUser])

  const onSearch = (search) => {
    fetchUsers(search).then(data => setUsers(data)).finally(() => setLoading(false))
  }

  if(loading) {
    return <div style={{weight: '100vh', height: window.innerHeight, background:'#272727', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Spin tip="Загрузка..." size="large"/>
    </div>
  } 
  return (
    <div className="admin__component-users">
        <h2 className="admin__component-title">Пользователи</h2>
        <div className="admin__component-users__list">
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
            <AdminUsersList setSelectedUser={setSelectedUser} setIsUserModalUpdate={setIsUserModalUpdate} changeUser={setChangeUser} users={users}/>
        </div>
        <AdminUserUpdate visible={isUserModalUpdate} selectedUser={selectedUser} setSelectedUser={setSelectedUser} setChangeUser={setChangeUser} onHide={() => setIsUserModalUpdate(false)} />
    </div>
  )
}

export default AdminUsers