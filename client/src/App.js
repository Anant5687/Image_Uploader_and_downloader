import Home from "./pages/Home";
import UploadArea from "./pages/UploadArea";
import { Routes, Route } from 'react-router-dom'
import SignUp from "./pages/SignUp/SignUp";
import LoginP from './pages/Login/LoginP'
import Protected from './components/Protection/Protection'

function App() {
  return (
    <>
      <Routes>
        <Route path='/home' element={<Protected Component={Home} />} />
        <Route path='/upload' element={<Protected Component={UploadArea} />} />
        <Route path='/' element={<LoginP />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
