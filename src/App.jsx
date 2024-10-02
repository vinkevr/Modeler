import { useContext} from 'react'
import Index from './components/paginas/Index'
import { Route, Routes, Navigate } from 'react-router';
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
import UserContext from './context/UserContext';
function App() {
const {user} = useContext(UserContext);

  return (
    <>
       <Routes>
          <Route path="/" element={ <Index />}/>
          <Route path="login" element={ <Login />}/>
          <Route path="create" element={<CreateAccount />}/>
          <Route path="panel" element = {user.verificado ?  <Panel />: <Navigate to="/login"/>} />
          <Route path="project/:id" element = {user.verificado ?  <Project />: <Navigate to="/login"/>}/>
          <Route path="recover" element = {<RecoverPassword />}/>
          <Route path="reset/:id" element = {<ResetPassword />}/>
          <Route path="recovermess" element = {<RecoverPassMessage />}/>
          <Route path="verify" element = {<VerifyEmail />}/>
          <Route path="verified/:token" element = {<AccountVerified />}/>
          <Route path="notfound" element = {<NotFound />}/>
       </Routes>
    </>
  );
}

export default App
