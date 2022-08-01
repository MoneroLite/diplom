import React, { useState } from 'react'
import Gear from '../../assets/gear.svg'
import DeleteBin from '../../assets/deleteBin.svg'
import { Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { DeleteOneUser } from '../../http/userAPI';

const AdminUsersItem = ({changeUser, setIsUserModalUpdate, selectedUser, setSelectedUser, user}) => {
  const [visibleConf, setVisibleConf] = useState(false);

  const showPopconfirm = () => {
    setVisibleConf(true);
  };

  const DeleteUser = () => {
    setVisibleConf(false);
    DeleteOneUser(user.id).then(data => changeUser(true)).finally(() => message.success('Пользователь удален'))
  }

  return (
    <div className="admin__users">
        <div className="admin__users-left">
          <div>
            <div className="admin__users-left__title">{user.login}</div>
          </div>
        </div>
        <div className="admin__users-rigth">
          <div>
            <img className="admin__users-rigth__settings" src={Gear} onClick={() => {setSelectedUser(user); setIsUserModalUpdate(true)}} alt='gear'/>
            <Popconfirm 
              visible={visibleConf} 
              placement="top" 
              title={`Вы ходите удалить пользователя ${user.login}?`}
              onConfirm={DeleteUser} 
              onCancel={() => setVisibleConf(false)}
              okText="Да" 
              cancelText="Нет"
              icon={<DeleteOutlined style={{color: '#EA0000'}}/>}
            >
              <img onClick={showPopconfirm} className="admin__users-rigth__delete" src={DeleteBin} alt='gear'/>
            </Popconfirm>
          </div>
        </div>
      </div>
  )
}

export default AdminUsersItem