import { Navigate, Outlet } from 'react-router'
import { useLogin } from '../../context/LoginContext'
import configuration from '../../configuration.json'

const ProtectedRoute = () => {
  const { login } = useLogin()

  if (login === undefined) {
    return <Navigate to={configuration.urls.loginUrl} replace />
  }

  return <Outlet />
}

export default ProtectedRoute