import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';
function App() {

  return (
      
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>

  )
}

export default App
