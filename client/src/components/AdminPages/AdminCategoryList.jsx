import React from 'react'
import AdminCategoryItem from './AdminCategoryItem'

const AdminCategoryList = ({setChangeCategory,setModalUpdate, setCategory, category}) => {
    if (category.length) return (
        category.map(category => 
                    <AdminCategoryItem setCategory={setCategory} setModalUpdate={setModalUpdate} setChangeCategory={setChangeCategory} key={category.id} category={category} />
                )
        )
        return (
          <div className='no__post'>Тут пока нет категорий</div>
        )
}

export default AdminCategoryList