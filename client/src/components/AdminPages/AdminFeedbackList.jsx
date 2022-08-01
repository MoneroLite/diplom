import React from 'react'
import AdminFeedItem from './AdminFeedItem'

const AdminFeedbackList = ({ feedback, setChangeFeedback}) => {
  
    if (feedback.length) return (
        feedback.map(feedback => 
            <AdminFeedItem setChangeFeedback={setChangeFeedback} feedback={feedback} key={feedback.id}/>
            )
        )
        return (
          <div className='no__post'>Тут пока нет вопросов</div>
        )
}


export default AdminFeedbackList