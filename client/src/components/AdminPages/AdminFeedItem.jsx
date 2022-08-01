import React, { useState } from 'react'
import { Popconfirm, message } from 'antd';
import checkMark from '../../assets/checkMark.svg'
import { DeleteOneFeedback } from '../../http/feedbackAPI';

const AdminFeedItem = ({feedback, setChangeFeedback}) => {
    const [visibleConf, setVisibleConf]= useState(false)

    const showPopconfirm = () => {
        setVisibleConf(true);
      }

    const deleteFeedback = () => {
        setVisibleConf(false)
        DeleteOneFeedback(feedback.id).then(() => message.success('Вопрос закрыт'))
        setChangeFeedback(true)
    }

  return (
    <div className="admin__component-feedback">
        <div className="admin__component-feedback__up">
            <p className="admin__component-feedback__up-text">{feedback.text}</p>
        </div>
        <div className="admin__component-feedback__down">
          <div>
            <p className="admin__component-feedback__down-date">{feedback.date}</p>
          </div>
            
            <Popconfirm 
              visible={visibleConf} 
              placement="top" 
              title={`Вопрос был решен?`}
              onConfirm={deleteFeedback} 
              onCancel={() => setVisibleConf(false)}
              okText="Да" 
              cancelText="Нет"
            >
              <img className="admin__component-feedback__down-img" onClick={() => showPopconfirm()} src={checkMark} alt='img'/>
            </Popconfirm>
        </div>
        
        
    </div>
  )
}

export default AdminFeedItem