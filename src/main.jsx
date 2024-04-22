import React from 'react'
import UserProvider  from './context/UserProvider.jsx'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom';



ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
  <React.StrictMode>
      <UserProvider>
          <App />
      </UserProvider>
  </React.StrictMode>
  </Router>,
)
