import React, { useState } from 'react'
import { Popconfirm, message } from 'antd';
import Gear from '../../assets/gear.svg'
import DeleteBin from '../../assets/deleteBin.svg'
import { DeleteOutlined } from '@ant-design/icons';
import { DeleteOneCategory } from '../../http/categoryAPI';

const AdminCategoryItem = ({setChangeCategory, setCategory, setModalUpdate, category}) => {
  const [visibleConf, setVisibleConf] = useState(false); 

  const showPopconfirm = () => {
    setVisibleConf(true);
  };
  const DeleteCategory = () => {
    setVisibleConf(false);
    DeleteOneCategory(category.id).then(data => setChangeCategory(true)).finally(() => message.success('Категория удалена'))
  }

  return (
    <div className="admin__category">
        <div className="admin__category-left">
          <img className="admin__category-left__img" src={process.env.REACT_APP_API_URL + category.img} alt="img"/>
          <div>
            <div className="admin__category-left__title">{category.title}</div>
            <div className="admin__category-left__info"> {category.description}</div>
          </div>
        </div>
        <div className="admin__category-rigth">
          <div>
            <img className="admin__category-rigth__settings" onClick={() => {setModalUpdate(true); setCategory(category)}} src={Gear} alt='gear'/>
            <Popconfirm 
              visible={visibleConf} 
              placement="top" 
              title={`Вы ходите удалить категорию ${category.title}?`}
              onConfirm={DeleteCategory} 
              onCancel={() => setVisibleConf(false)}
              okText="Да" 
              cancelText="Нет"
              icon={<DeleteOutlined style={{color: '#EA0000'}}/>}
            >
              <img onClick={()=> showPopconfirm()} className="admin__category-rigth__delete" src={DeleteBin} alt='gear'/>
            </Popconfirm>
          </div>
        </div>
      </div>
  )
}

export default AdminCategoryItem