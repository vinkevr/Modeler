import { useState } from 'react'
import Index from './components/paginas/Index'
import { Outlet, Route, Routes, useLocation, Navigate } from 'react-router';
import Login from './components/paginas/Login'
import CreateAccount from './components/paginas/CreateAccount'
import Panel from './components/paginas/Panel';
import Project from './components/paginas/Project';
import RecoverPassword from './components/paginas/RecoverPassword';
import ResetPassword from './components/paginas/ResetPassword';
import RecoverPassMessage from './components/paginas/RecoverPassMessage';
import VerifyEmail from './components/paginas/VerifyEmail';
import AccountVerified from './components/paginas/AccountVerified';
import ExpiredToken from './components/paginas/ExpiredToken';
import NotFound from './components/paginas/NotFound';

function App() {


  return (
    <>
       <Routes>
          <Route path="/" element={ <Index />}/>
          <Route path="login" element={ <Login />}/>
          <Route path="create" element={ <CreateAccount />}/>
          <Route path="panel" element = {<Panel />} />
          <Route path="project" element = {<Project />}/>
          <Route path="recover" element = {<RecoverPassword />}/>
          <Route path="reset" element = {<ResetPassword />}/>
          <Route path="recovermess" element = {<RecoverPassMessage />}/>
          <Route path="verify" element = {<VerifyEmail />}/>
          <Route path="verified" element = {<AccountVerified />}/>
          <Route path="expired" element = {<ExpiredToken />}/>
          <Route path="notfound" element = {<NotFound />}/>
       </Routes>
    </>
  );
}

export default App
