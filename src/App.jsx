import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SideBar from './components/SideBar';
import Home from './components/Home';
import { useDevice } from './hooks/useDevice';
// import NavBar from './components/NavBar';
// import Header from './components/Header';

function App() {
  const { isMobile } = useDevice();

  console.log(isMobile, "isMobile");

  return (
    <>
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* 
            Project Details page
            <Route path="/project/:id" element={<ProjectDetails />} />
            Blogs/Post page which has a link to linkedIn
            <Route path="/blogs" element={<Blogs />} />
          */}
        </Routes>
      </BrowserRouter>    
    </>
  )
}

export default App
