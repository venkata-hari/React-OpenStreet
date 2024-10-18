import {Routes,Route, Navigate} from 'react-router-dom'
import Profile from './Components/Profile';
import ProfileForm from './Components/ProfileForm';
import NotFound from './Components/NotFound';
function MainRoute() {
  return (
    <Routes>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/profile-form' element={<ProfileForm/>}/>
    <Route path='/' element={<Navigate to="/profile-form" />} />
    <Route path='/404' element={<NotFound/>}/>
    <Route path='*' element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default MainRoute;
