import './App.css'
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className='flex justify-between'>
          <div id='left container' className='w-2/12'>
            <Sidebar/>
          </div>
          <div id='right-container' className='w-10/12'>
          <div>
          <Navbar/>
          </div>
            <div>
              <Outlet/>
              <div>
                  <Footer/>
              </div>
            </div>
          </div>
      </div>
  )
}

export default App
