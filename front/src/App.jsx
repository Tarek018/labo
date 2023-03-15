import logo from './logo.svg';
import { Routes,Route } from "solid-app-router";
import Qrcode from './pages/student/qrcode';
import loginadmin from './pages/loginadmin';
import admindash from './admindash';
import Permanent_users_form from './pages/Permanent_users_form';
import loginagent from './pages/agentsecurity/loginagent';
import scanqrcode from './pages/agentsecurity/scanqrcode';
import verifybyid from './pages/agentsecurity/verifybyid';
import home from './pages/home';





function App() {
  
  return (
    <>
      <Routes>
      <Route path='/' component={home}></Route>
        <Route path='/createqrcode' component={Qrcode}></Route>
        <Route path='/loginadmin' component={loginadmin}></Route>
        <Route path='/admindash' component={admindash}></Route>
        <Route path='/login' component={Permanent_users_form}></Route>
        <Route path='/loginagent' component={loginagent}></Route>
        <Route path='/agentscan' component={scanqrcode}></Route>
        <Route path='/verifybyid' component={verifybyid}></Route>



        
      </Routes>
    </>
  );
}

export default App;
