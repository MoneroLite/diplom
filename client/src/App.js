import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from "./index";
import AppRouter from './components/AppRouter';
import NavBar from "./components/NavBar/NavBar";
import { check } from "./http/userAPI";
import { Spin } from 'antd';

const App = observer(() => {
  const {user} = useContext(Context)

  const[loading, setLoading] = useState(true)

  useEffect(() => {
      check().then( data => {
        user.setUser(data)
        user.setIsAuth(true)
      }).finally(() => setLoading(false))
  }, [])

  if(loading) {
    return <div style={{weight: '100vh', height: window.innerHeight, background:'#272727', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Spin tip="Загрузка..." size="large"/>
    </div>

  }

  return (
      <BrowserRouter>
        <NavBar/>
        <AppRouter/>
      </BrowserRouter>
  );
})

export default App;
