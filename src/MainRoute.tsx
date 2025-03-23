import {Routes,Route, Navigate} from 'react-router-dom'
import Profile from './Components/Profile';
import Login from './Components/Login';
import Map from './Components/Map/OpenStreetMap';
function MainRoute() {
  return (
    <Routes>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/' element={<Login/>}/>
    <Route path='/map' element={<Map/>}/>
    </Routes>
  );
}

export default MainRoute;
