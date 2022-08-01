import React from 'react'
import { Tag } from 'antd';

const TagListPost = ({tags}) => {
    if (tags.length) return (
        tags.map(tag => 
                    <Tag className="post__tags-tag" key={tag.id}>{tag.tag ? tag.tag.name : 'тег удален'}</Tag>
                    )
        )
        return (
          <div className=''></div>
        )
}

export default TagListPost