import { Navigate, NavLink, Outlet } from 'react-router'
import { useLogin } from '../../context/LoginContext'
import configuration from '../../configuration.json'
import TopBar from '../../Components/TopBar/TopBar'
import SideBar from '../../Components/SideBar/SideBar'
import { useLocation } from 'react-router'
import './ProtectedRoute.css'

const ProtectedRoute = () => {
  const { login } = useLogin();
  const location = useLocation();

  if (login === undefined && configuration.debugMode !== 'true') {
    return <Navigate to={configuration.urls.loginUrl} replace />
  }

  return (
    <>
      <nav>
        {location.pathname !== '/' && <NavLink className='home-button' to="/">Home</NavLink>}
      </nav>
      
      <TopBar/>
      <SideBar/>
      
      <Outlet />
    </>
  )
}

export default ProtectedRoute