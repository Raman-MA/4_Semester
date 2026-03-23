import logo from '../../assets/svendborgpng.png'
import Button from '../../components/Button'
import useAppNavigation from '../../hooks/useAppNavigation'

function DashboardPage() {
  const { goToLogin } = useAppNavigation()

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
            <Button className="sidebar-btn active">Oversigt</Button>
            <Button className="sidebar-btn">Opret</Button>
            <Button className="sidebar-btn">Forecast</Button>
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
            <Button className="logout-btn" onClick={goToLogin}            >
              Log ud
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
