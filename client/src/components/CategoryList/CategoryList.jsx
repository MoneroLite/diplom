import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../../index'
import CategoryItem from '../CategoryItem/CategoryItem'

const CategoryList = observer(() => {
    const {category} = useContext(Context)

  return (
    <div>
        {category.category.map(category => 
            <CategoryItem key={category.id} category={category}/>
            )}
    </div>
  )
})

export default CategoryList