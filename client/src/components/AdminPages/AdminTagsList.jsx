import React from 'react'
import AdminTagsItem from './AdminTagsItem'

const AdminTagsList = ({tags, setChangeTags}) => {
    console.log(tags)
    if (tags.length) return (
        tags.map(tag => 
                    <AdminTagsItem setChangeTags={setChangeTags} key={tag.id} tag={tag} />
                )
        )
        return (
          <div className='no__post'>Тут пока нет тегов</div>
        )
}

export default AdminTagsList