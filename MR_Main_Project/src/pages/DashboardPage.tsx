import { useNavigate } from 'react-router-dom'
import logo from '../assets/svendborgpng.png'

function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div className="dashboard-page">
      <div className="dashboard-body">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <img
              src={logo}
              alt="logo"
              className="sidebar-logo-img"
            />
          </div>

          <div className="sidebar-buttons">
            <button className="sidebar-btn active">Oversigt</button>
            <button className="sidebar-btn">Opret</button>
            <button className="sidebar-btn">Forecast</button>
          </div>
        </aside>

        <div className="right-panel">
          <nav className="top-nav">
            <ul className="nav-links">
              <li><a href="#" className="active">Home</a></li>
              <li><a href="#">Kontakt</a></li>
              <li><a href="#">Om os</a></li>
            </ul>
          </nav>

          <main className="main-content" />
          <div className="dashboard-actions">
            <button
              className="logout-btn"
              type="button"
              onClick={() => navigate('/')}
            >
              Log ud
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
