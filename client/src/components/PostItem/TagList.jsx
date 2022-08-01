import React from 'react'
import { Tag } from 'antd';

const TagList = ({tag}) => {
    if (tag.length) return (
        tag.map(tag => 
                    // <PostItem  key={post.id} post={post} />
                    <Tag className="category__post-tag" key={tag.id}>{tag.tag ? tag.tag.name : 'Тег удален'}</Tag>
                    )
        )
        
        return (
          <div className=''></div>
        )
}

export default TagList