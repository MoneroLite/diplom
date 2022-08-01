import React, { useEffect, useState } from 'react'
import { Spin } from 'antd';
import { fetchCategory } from '../../http/categoryAPI';
import { fetchPost } from '../../http/postAPI';
import { fetchUsers } from '../../http/userAPI';
import svgAdminCategory from '../../assets/adminCategory.svg'
import svgAdminPost from '../../assets/adminPost.svg'
import svgAdminUser from '../../assets/adminUsers.svg'
import { Chart } from './Chart';
import { ChartPie } from './ChartPie';
import { fetchCatPostCount } from '../../http/dashedAPI';
// import Chart from './Chart'

const AdminDash = () => {
    const[category, setCategory] = useState({})
    const[post, setPost] = useState({})
    const[users, setUsers] = useState({})
    const[loading, setLoading] = useState(true)
    const[chartCatPost, setChartCatPost] = useState()
    const[visibleChart, setVisibleChart] = useState(false)
    
  useEffect(() => {
    fetchCategory().then(data => setCategory(data))
    fetchPost().then(data => setPost(data))
    fetchCatPostCount().then(data => setChartCatPost(data)).finally(() => setVisibleChart(true))
    fetchUsers().then(data => setUsers(data)).finally(() => setLoading(false))
  }, [])

//  console.log(category.length)
  if(loading) {
    return <div style={{weight: '100vh', height: window.innerHeight, background:'#272727', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Spin tip="Загрузка..." size="large"/>
    </div>
  } 
  return (
    <div className="admin__component-dash">
        <h2 className="admin__component-title">Дэшборд</h2>
        <div className="admin__component-dash__menu">
            <div className="admin__component-dash__menu-item">
                <div className="admin__component-dash__menu-item__data">
                    <p className="admin__component-dash__menu-item__length">{category.length}</p>
                    <p className="admin__component-dash__menu-item__text">Категории</p>
                </div>
                <img src={svgAdminCategory} alt='img'/>
            </div>
            <div className="admin__component-dash__menu-item">
                <div className="admin__component-dash__menu-item__data">
                    <p className="admin__component-dash__menu-item__length">{post.length}</p>
                    <p className="admin__component-dash__menu-item__text">Посты</p>
                </div>
                <img src={svgAdminPost} alt='img'/>
            </div>
            <div className="admin__component-dash__menu-item">
                <div className="admin__component-dash__menu-item__data">
                    <p className="admin__component-dash__menu-item__length">{users.length}</p>
                    <p className="admin__component-dash__menu-item__text">Пользователи</p>
                </div>
                <img src={svgAdminUser} alt='img'/>
            </div>
        </div>
        <div className="chart__tag">
          { !visibleChart ? <Spin/> :
            <div style={{display: 'flex'}}>
              <Chart dataChart={chartCatPost}/>
              {/* <ChartPie/> */}
            </div>
          }
        </div>
    </div>
  )
}

export default AdminDash