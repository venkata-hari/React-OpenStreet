import {Routes,Route, Navigate} from 'react-router-dom'
import Dashboard from './Components/dashboard';
import Login from './Components/Login';
import Map from './Components/Map/OpenStreetMap';
function MainRoute() {
  return (
    <Routes>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/' element={<Login/>}/>
    <Route path='/map' element={<Map/>}/>
    </Routes>
  );
}

export default MainRoute;
