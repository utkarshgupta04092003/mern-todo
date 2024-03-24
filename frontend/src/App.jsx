import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';
import Profile from './pages/Profile';
function App() {

  return (
      
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>

  )
}

export default App
