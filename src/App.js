import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignIn } from './pages/AuthPage/signIn';
import { SignUp } from './pages/AuthPage/signup';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PlartFormHome } from './pages/Homepage/homepage';
import { PlartFormLaunch } from './pages/Mainpage/main';


function App() {
 
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path='/dashboard' element={ <PlartFormHome/>}/>
          <Route exact path='/' element={ <SignIn/>}/>
          <Route exact path='/profile' element={ <SignIn/>}/>
          <Route exact path='/auth/signUp' element={ <SignUp/>}/>
          <Route exact path='/board/:name' element={ <PlartFormLaunch/>}/>
        </Routes>
      </Router>
    <ToastContainer />
    </Provider>
    
    
  );
}

export default App;
// import React from 'react';
// import './App.css';
// import {HomePage} from './homepage'

// 
// import { CartDetail } from './subpage/store/cartpage';
// 
// import { RegisterUser } from './subpage/registerUser';
// import { LogInuser } from './subpage/loginUser';
// import { AdminPage } from './subpage/admin'

// const App =()=> {
//   return (
//     
//   );
// }

// export default App;