import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { DAppProvider } from '@usedapp/core'

ReactDOM.render(
  // React.StrictMode 要渲染的所有元素 
  <React.StrictMode>  
    <DAppProvider>
      <App/>
    </DAppProvider>
  </React.StrictMode>,
  //将渲染的结果插入到页面中的哪一个容器中
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
