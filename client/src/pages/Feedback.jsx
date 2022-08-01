import { Button, Input, message } from 'antd'
import React, { useContext, useState } from 'react'
import { Context } from '../index'
import { createFeedback } from '../http/feedbackAPI'
import './Styles/Feedback.css'

const Feedback = () => {
  const {user} = useContext(Context)
  const [feedback, setFeedback] = useState('')

  const feedbackSend =() =>{
    if (!feedback) {
      message.error('Введите сообщение')
    } else {
      const formData = new FormData()
      const date = new Date()

      formData.append('text', feedback)
      formData.append('date', `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`)
      formData.append('userId', user.user.id)

      createFeedback(formData).then((data) => message.success('Сообщение отправлено'))
      setFeedback('')
    }
  }
  return (
    <div className='container'>
      <div className='feedback'>
        <h2 className='feedback__title'>Введите сообщение, которое нужно доставить администрации:</h2>
        <Input value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder='Сообщение' className='feedback__input'/>
        <Button onClick={feedbackSend} className='feedback__btn'>Отправить сообщение</Button>
      </div>
    </div>
  )
}

export default Feedback