import React, { useEffect, useState } from 'react'
import { message, Select, Button, Modal, Input } from 'antd';
import { updateUser, updateUserImg } from '../../../http/userAPI';

const AdminUserUpdate = ({selectedUser, setSelectedUser, setChangeUser, visible, onHide}) => {
    const { Option } = Select;

    const[newImg, setNewImg] = useState()
    
    // const selectFile = e => {
    //     // сохраняем файл в состояниях по 0 индексу!!!
    //     // setNewImg(e.target.files[0])
    //     setNewImg( e.target.files[0])
    //     console.log(newImg)
        
    //   }

      const updateUserFunc = () => {
        // console.log(newImg)
        // console.log(selectedUser.id)
        // console.log(selectedUser.target.files[0])
        if(newImg){
            const formData = new FormData()
            // console.log(newImg)
            formData.append('id', selectedUser.id)
            formData.append('role', selectedUser.role)
            formData.append('avatar', newImg)
            formData.append('password', selectedUser.password)
            // const data = {id: selectedUser.id, role: selectedUser.role, avatar: newImg}
            try {
                updateUserImg(formData).then(data => onHide())
                // setChangeCategory(true)
              } catch (e) {
                message.error(e.response.data.message)
              }
        } else{
            try {
                updateUser({id: selectedUser.id, password: selectedUser.password, role: selectedUser.role}).then(data => onHide())
                // setChangeCategory(true)
              } catch (e) {
                message.error(e.response.data.message)
              }
        }
        setChangeUser(true)
    }

    
    

 if(!selectedUser){
     return ''
 }
//  console.log(selectedUser.role)

  const onClickRole = (value) => {
    // message.info(`Click on item ${value}`);
    setSelectedUser((prevState) => ({...prevState, role: value}))
  };

  return (
    <div>
        <Modal width='50%' maskStyle={{background: "RGBA(0,0,0,0.7)",  backdropFilter: 'blur(5px)'}} title={`Изменить пользователя ${selectedUser.login}`} visible={visible} onOk={updateUserFunc} onCancel={() => onHide(false)}>
          {/* <Input value={selectedUser.role} onChange={(e) => setSelectedUser((prevState) => ({...prevState, role: e.target.value}))} placeholder="Заголовок" /> */}
          <div className="modal__wrap-content">
            <p className="modal__wrap-content__text">Роль: </p>
            <Select value={selectedUser.role} style={{ width: 160 }} onChange={onClickRole}>
              <Option value="USER">Пользователь</Option>
              <Option value="ADMIN">Администратор</Option>
            </Select>
          </div>
          <div className="modal__wrap-content">
            <p className="modal__wrap-content__text">Пароль: </p>
            <Input.Password value={selectedUser.password} onChange={(e) => setSelectedUser((prevState) => ({...prevState, password: e.target.value}))} placeholder="Новый пароль" />
          </div>
          <div className="modal__wrap-content">
            <p className="modal__wrap-content__text">Изображение: </p>
            <input onChange={(e) => setNewImg( e.target.files[0])} type='file'/>
          </div>
         
         
          {/* <img style={{width: '41px'}} src={process.env.REACT_APP_API_URL + oneCategory.img} alt="img"/> */}
         
      </Modal>
    </div>
  )
}

export default AdminUserUpdate