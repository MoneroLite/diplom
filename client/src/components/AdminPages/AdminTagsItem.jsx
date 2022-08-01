import React, { useState } from 'react'
import DeleteBin from '../../assets/deleteBin.svg'
import { Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { DeleteOneTag } from '../../http/tagAPI';

const AdminTagsItem = ({tag, setChangeTags}) => {
    const [visibleConf, setVisibleConf] = useState(false);

    const DeleteTag = () => {
        setVisibleConf(false);
        DeleteOneTag(tag.id).then(data => setChangeTags(true)).finally(() => message.success('Тег удален'))
      }

  return (
    <div className="admin__post">
        <div className="admin__post-left">
          <div>
            <div className="admin__post-left__title">{tag.name}</div>
          </div>
        </div>
        <div className="admin__post-rigth">
          <div>
            <Popconfirm 
              visible={visibleConf} 
              placement="top" 
              title={`Вы хотите удалить данный тег?`}
              onConfirm={DeleteTag} 
              onCancel={() => setVisibleConf(false)} 
              okText="Да" 
              cancelText="Нет"
              icon={<DeleteOutlined style={{color: '#EA0000'}}/>}
            >
              <img onClick={() => setVisibleConf(true)}className="admin__post-rigth__delete" src={DeleteBin} alt='gear'/>
            </Popconfirm>
          </div>
        </div>
      </div>
  )
}

export default AdminTagsItem