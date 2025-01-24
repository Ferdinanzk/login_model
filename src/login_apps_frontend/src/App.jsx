import { useState } from 'react';
import { login_apps_backend } from 'declarations/login_apps_backend';

import { useAuth, AuthProvider } from './AuthProvider' // sama kayak laravel buat authnya dlu (namabahin authprovider)

import Home from './Home';
import Logout from './Logout';

function App() {
  const { isAuth } = useAuth();//with this type call can acces the fucntion on the Authrpovide result


  //clear the original code main file
  return (
    <main>
      {isAuth ? <Home /> : <Logout />}
    </main>
  );//end return

}//end App

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
