import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import CategoryStore from './store/CategoryStore';
import PostStore from './store/PostStore';

// нужен для того, чтоб прокидывать состояние в компоненты
export const Context = createContext(null)


ReactDOM.render(
  <Context.Provider value={{
    // передаем объект, в поле юзер создаем новый объект класса UserStore
    user: new UserStore(),
    category: new CategoryStore(),
    post: new PostStore(),

  }}>
  <App />
  </Context.Provider>,
  document.getElementById('root')
);


