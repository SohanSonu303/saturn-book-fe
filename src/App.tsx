import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { MainDashboard } from './pages/MainDashboard'
import { Viewpost } from './pages/Viewpost'
import { Createpost } from './pages/Createpost'
import Redirector from './components/Redirector'
import { ShowPosts } from './pages/ShowPosts'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Redirector/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/maindashboard" element={<MainDashboard />} />
          <Route path="/viewpost" element={<Viewpost />} />
          <Route path="/showposts" element={<ShowPosts/>} />
          <Route path="/createpost" element={<Createpost />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App