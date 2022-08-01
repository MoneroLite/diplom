import React, { useEffect, useState } from 'react'
import { Spin } from 'antd';
import { fetchFeedback } from '../../http/feedbackAPI'
import AdminFeedbackList from './AdminFeedbackList'

const AdminFeedback = () => {
  const[loading, setLoading] = useState(true)
  const[feedback, setFeedback] = useState({})
  const[changeFeedback, setChangeFeedback] = useState(false)

  useEffect(() => {
    setChangeFeedback(false)
    fetchFeedback().then(data => setFeedback(data)).finally(() => setLoading(false))
  }, [changeFeedback])

  if(loading) {
    return <div style={{weight: '100vh', height: window.innerHeight, background:'#272727', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Spin tip="Загрузка..." size="large"/>
    </div>
  } 
  return (
    <div>
      <div className="admin__component-feedback__list">
      <h2 className="admin__component-title">Обратная связь</h2>
      <AdminFeedbackList feedback={feedback} setChangeFeedback={setChangeFeedback}/>
      </div>
      
    </div>
  )
}

export default AdminFeedback