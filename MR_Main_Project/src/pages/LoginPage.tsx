import { useNavigate } from 'react-router-dom'
import logo from '../assets/svendborgpng.png'

function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="login-page">
      <div className="login-header">
        <div className="login-logo">
          <img
            src={logo}
            alt="logo"
            className="logo-img"
          />
        </div>
        <h1 className="login-title">Velkommen</h1>
      </div>

      <div className="login-card">
        <div className="form-group">
          <label htmlFor="bruger">Brugernavn</label>
          <input
            type="text"
            id="bruger"
            name="bruger"
            placeholder="Indtast brugernavn"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Kodeord</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Indtast Adgangskode"
          />
        </div>

        <button className="login-btn" type="button" onClick={() => navigate('/dashboard')}>
          Log ind
        </button>

        <div className="login-links">
          <a href="#">Glemt kodeord?</a>
          <a href="#">Opret konto</a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
