import React, { Suspense, useEffect } from 'react';
import { GobalState } from './ContextApi/GobalState'; 
import NavBar from './Components/NavBar';
function App() {
  const MainRoute = React.lazy(() => import('./MainRoute'));
 useEffect(()=>{
  const env=localStorage.getItem('env')
  if(process.env.REACT_APP_ENV!==env){
   localStorage.clear()
  }
 },[])
  return (
    <GobalState>
      <Suspense fallback={<div>...loading</div>}>
        <NavBar/>
        <MainRoute />
      </Suspense>
    </GobalState>
  );
}

export default App;
