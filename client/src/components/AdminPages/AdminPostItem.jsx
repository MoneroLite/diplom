import React, { useState } from 'react'
// import Gear from '../../assets/gear.svg'
import DeleteBin from '../../assets/deleteBin.svg'
import { Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { DeleteOnePost } from '../../http/postAPI';

const AdminPostItem = ({changePost, post}) => {

  const [visibleConf, setVisibleConf] = useState(false);

  const showPopconfirm = () => {
    setVisibleConf(true);
  };

  const DeletePost = () => {
    setVisibleConf(false);
    DeleteOnePost(post.id).then(data => changePost(true)).finally(() => message.success('Пост удален'))
  }
  return(
      <div className="admin__post">
        <div className="admin__post-left">
          <div>
            <div className="admin__post-left__title">{post.title}</div>
            <div className="admin__post-left__info"> {post.date}</div>
          </div>
        </div>
        <div className="admin__post-rigth">
          <div>
            <Popconfirm 
              visible={visibleConf} 
              placement="top" 
              title={`Вы хотите удалить данный пост?`}
              onConfirm={DeletePost} 
              onCancel={() => setVisibleConf(false)} 
              okText="Да" 
              cancelText="Нет"
              icon={<DeleteOutlined style={{color: '#EA0000'}}/>}
            >
              <img onClick={showPopconfirm} className="admin__post-rigth__delete" src={DeleteBin} alt='gear'/>
            </Popconfirm>
          </div>
        </div>
      </div>
    )
}

export default AdminPostItem