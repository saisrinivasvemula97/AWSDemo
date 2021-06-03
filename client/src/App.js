import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {UserInfo} from './Components/UserInfo/UserInfo';
import {Registration} from './Components/Registration/Registration';
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Registration}/>
        <Route exact path="/userInfo" component={UserInfo}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
