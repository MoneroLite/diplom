import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORY_ROUTE } from '../../utils/consts'

const CategoryItem = ({category}) => {
    const history = useNavigate()
    // console.log(category)
  return (
    <div className='category' onClick={() => history(CATEGORY_ROUTE + '/' + category.id)}>
      <img className='category__img' style={{width: '41px', height: '41px'}} src={process.env.REACT_APP_API_URL + category.img} alt='img'/>
      <div className='category__data'>
        <div className=''>
          <div className='category__data-title'>{category.title}</div>
          <div className='category__data-description'>{category.description}</div>
        </div>
      </div>

      <div className='category__posts'>
        <div className='category__posts-num'>{category.posts.length}</div>
        <div className='category__posts-thems'>тем</div>
      </div>
        
    </div>
  )
}

export default CategoryItem