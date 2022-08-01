import React from 'react'
import AdminUsersItem from './AdminUsersItem'

const AdminUsersList = ({changeUser, setIsUserModalUpdate, selectedUser, setSelectedUser, users}) => {
    if (users.length) return (
        users.map(user => 
                    <AdminUsersItem setIsUserModalUpdate={setIsUserModalUpdate} selectedUser={selectedUser} setSelectedUser={setSelectedUser} changeUser={changeUser} key={user.id} user={user} />
                )
        )
        return (
          <div className='no__post'>Тут пока нет пользователей</div>
        )
}

export default AdminUsersList