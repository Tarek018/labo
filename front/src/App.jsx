import logo from './logo.svg';
import Sign from'./pages/student/signup'
import { Routes,Route } from "solid-app-router";
import Qrcode from './pages/student/qrcode';
import teacherdash from './pages/teacher/teacherdash';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' component={Sign}></Route>
        <Route path='/studentqrcode' component={Qrcode}></Route>
        <Route path='/teacher' component={teacherdash}></Route>
      </Routes>
    </>
  );
}

export default App;
