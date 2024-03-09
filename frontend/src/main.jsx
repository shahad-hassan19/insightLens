import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import HomePage from './pages/Home/HomePage';
import LogIn from './pages/LogIn/LogIn';
import Layout from './Layout'
import Register from './pages/Register/Register';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Admin from './components/UserProfile/Admin';
import Settings from './components/Settings/Settings.jsx'
import UserHome from './components/UserHome/UserHome'
import SectorData from './Charts/SectorData.jsx'
import IntensityData from './Charts/IntensityData';
import YearData from './Charts/YearData';
import PestleData from './Charts/PestleData';
import CountryData from './Charts/CountryData';


const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<App/>}>
        <Route path='' element={<HomePage/>} />
        <Route path='login' element={<LogIn/>} />
        <Route path='register' element={<Register/>} />
        <Route path='/user/' element={<Layout/>} >
          <Route path='' element={<UserHome/>} />
          <Route path='user-profile' element={<Admin/>} />
          <Route path='user-dashboard' element={<UserDashboard/>} />
          <Route path='sector' element={<SectorData/>} />
          <Route path='intensity' element={<IntensityData/>} />
          <Route path='pestle' element={<PestleData/>} />
          <Route path='year' element={<YearData/>} />
          <Route path='country' element={<CountryData/>} />
          <Route path='settings' element={<Settings/>} />
        </Route>
      </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
