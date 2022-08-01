import React, { useContext, useEffect, useState } from 'react'
import { fetchFavorit } from '../http/favoritAPI'
import { Context } from '../index'
import { Spin } from 'antd';
import { POST_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';

const Favorit = () => {
    const {user} = useContext(Context)
    // console.log(user.user.id);
    const [favorit, setFavorit] = useState()
    const[loading, setLoading] = useState(true)
    const history = useNavigate()

    useEffect(() => {
        fetchFavorit(user.user.id).then(data => setFavorit(data)).finally(() => setLoading(false))
      }, [])
  
    if(loading) {
      return <div style={{weight: '100vh', height: window.innerHeight, background:'#272727', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Spin tip="Загрузка..." size="large"/>
      </div>
  
    }
    
  return (
    <div className='container'>
      <p onClick={() => history(-1)} className="btn__back">назад</p>
        {favorit.length ?
        favorit.map( fav => 
            <div style={{marginTop: '20px'}}  key={fav.id} onClick={() => history(POST_ROUTE + '/' + fav.post.id)}>
                <div className="admin__post">
                    <div className="admin__post-left">
                        {/* <div> */}
                            <div className="admin__post-left__title">{fav.post.title}</div>
                            <div className="admin__post-left__info"> {fav.post.date}</div>
                        {/* </div> */}
                    </div>
                    <div className="admin__post-rigth">
            
                    </div>
                </div>     
            </div>
        ) :
        <h2 className="no__post">Тут нет избранных постов</h2>
      }
    </div>
  )
}

export default Favorit