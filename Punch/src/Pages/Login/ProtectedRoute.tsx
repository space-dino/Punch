import { Navigate, NavLink, Outlet } from 'react-router'
import { useLogin } from '../../context/LoginContext'
import configuration from '../../configuration.json'
import TopBar from '../../Components/TopBar/TopBar'
import SideBar from '../../Components/SideBar/SideBar'

const ProtectedRoute = () => {
  const { login } = useLogin()

  if (login === undefined && configuration.debugMode !== 'true') {
    return <Navigate to={configuration.urls.loginUrl} replace />
  }

  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
      </nav>
            
      <TopBar/>
      <SideBar/>

      <Outlet />
    </>
  )
}

export default ProtectedRoute