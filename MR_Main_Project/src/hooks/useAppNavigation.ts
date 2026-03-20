import { useNavigate } from 'react-router-dom'

function useAppNavigation() {
  const navigate = useNavigate()

  const goToDashboard = () => navigate('/dashboard')
  const goToLogin = () => navigate('/')

  return { goToDashboard, goToLogin }
}

export default useAppNavigation
