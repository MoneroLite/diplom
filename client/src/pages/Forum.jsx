import React, { useContext, useEffect } from 'react'
import { Context } from '../index'
import CategoryList from '../components/CategoryList/CategoryList'
import { observer } from 'mobx-react-lite'
import { fetchCategory } from '../http/categoryAPI'
import './Styles/Forum.css'

const Forum = observer(() => {
  const {category} = useContext(Context)

  useEffect(() => {
    fetchCategory().then(data => category.setCategory(data))
  })
  console.log(category)
  return (
    <div className='container'>
      <h2 className='forum__title'>Форум</h2>
      <CategoryList/>
    </div>
  )
})

export default Forum