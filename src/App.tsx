import React, { Suspense, useEffect } from 'react';
import NavBar from './Components/NavBar';
function App() {
  const MainRoute = React.lazy(() => import('./MainRoute'));

  return (

      <Suspense fallback={<div>...loading</div>}>
        <MainRoute />
      </Suspense>
  );
}

export default App;
