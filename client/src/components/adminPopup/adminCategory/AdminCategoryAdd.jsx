import React, { useState } from 'react'
import { Modal, Input, message, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { createCategory } from '../../../http/categoryAPI';

const AdminCategoryAdd = ({setChangeCategory, visible, onHide}) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [img, setImg] = useState(null)


    const selectFile = e => {
      // сохраняем файл в состояниях по 0 индексу!!!
      setImg(e.target.files[0])
      console.log(img)
    }

    const handleOk = () => {
      const formData = new FormData()
        if (title === '' || description === '') {
          message.error('Заполните все поля')
        } else {
          if (img == null) {
            message.error('Загрузите иконку')
          } else {
            formData.append('title', title)
            formData.append('description', description)
            formData.append('img', img)
            try {
              createCategory(formData).then(data => onHide())
              setChangeCategory(true)
            } catch (e) {
              message.error(e.response.data.message)
            }
          }
        }

        
    }

  
      // const upload = (file) => {
      //   console.log(file)
        
      // }

    // const props = {
    //   name: 'file',
    //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //   headers: {
    //     authorization: 'authorization-text',
    //   },
    //   onChange(info) {
    //     if (info.file.status !== 'uploading') {
    //       console.log(info);
    //     }
    //     if (info.file.status === 'done') {
    //       message.success(`Файл ${info.file.name} загружен`);
    //       setImg(info.file)
    //     } else if (info.file.status === 'error') {
    //       message.error(`Файл ${info.file.name} не загружен`);
    //     }
    //   },
    // };

  return (
    <div>
        <Modal width='50%' maskStyle={{background: "RGBA(0,0,0,0.7)",  backdropFilter: 'blur(5px)'}} title="Добавить категорию" visible={visible} onOk={handleOk} onCancel={onHide}>
          <div className="modal__wrap-content">
            <p className="modal__wrap-content__text">Название категории: </p>
            <Input maxLength={255} placeholder="Название категории" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="modal__wrap-content">
            <p className="modal__wrap-content__text">Описание категории: </p>
            <Input value={description} onChange={(e)=> setDescription(e.target.value)}  maxLength={255}  placeholder="Описание категории"  />
          </div>
          <div className="modal__wrap-content">
            <p className="modal__wrap-content__text">Изображение категории: </p>
            <input onChange={selectFile} type="file"></input>
          </div>
        </Modal>
    </div>
  )
}

export default AdminCategoryAdd