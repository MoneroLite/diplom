import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PAYMENT_ROUTE } from '../utils/consts'

const Status = () => {
  const history = useNavigate()
  return (
    <div>
      <Button onClick={() => history(PAYMENT_ROUTE)}>Пожертвовать</Button>
    </div>
  )
}

export default Status