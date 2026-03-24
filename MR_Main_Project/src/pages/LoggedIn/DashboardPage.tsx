import { useState } from 'react'
import logo from '../../assets/svendborgpng.png'
import Button from '../../components/Button'
import CreateUserForm, { type NewUser } from '../../components/CreateUserForm'
import List from '../../components/ListView'
import useAppNavigation from '../../hooks/useAppNavigation'

type DashboardView = 'oversigt' | 'opret' | 'forecast'

type UserItem = {
  id: number
  fullName: string
  password: string
}

function DashboardPage() {
  const { goToLogin } = useAppNavigation()
  const [currentView, setCurrentView] = useState<DashboardView>('oversigt')
  const [users, setUsers] = useState<UserItem[]>([])
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null)

  const handleCreateUser = (newUser: NewUser) => {
    const userToAdd: UserItem = {
      id: Date.now(),
      fullName: newUser.fullName,
      password: newUser.password,
    }

    setUsers((previousUsers) => [...previousUsers, userToAdd])
    setCurrentView('oversigt')
  }

  const renderMainContent = () => {
    if (currentView === 'opret') {
      return <CreateUserForm onCreateUser={handleCreateUser} />
    }

    if (currentView === 'forecast') {
      return <p className="main-placeholder">Forecast side kommer snart.</p>
    }

    return (
      <section>
        <h2 className="overview-title">Brugere</h2>
        {users.length === 0 ? (
          <p className="main-placeholder">Ingen brugere endnu. Klik på Opret for at tilføje en bruger.</p>
        ) : (
          <List
            items={users}
            keyExtractor={(user) => user.id}
            onSelectionChange={(user) => setSelectedUser(user)}
            renderItem={(user, isSelected) => (
              <div className={`user-row${isSelected ? ' selected' : ''}`}>
                <span>{user.fullName}</span>
              </div>
            )}
          />
        )}

        {selectedUser && <p className="selected-user-text">Valgt bruger: {selectedUser.fullName}</p>}
      </section>
    )
  }

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
            <Button
              className={`sidebar-btn${currentView === 'oversigt' ? ' active' : ''}`}
              onClick={() => setCurrentView('oversigt')}
            >
              Oversigt
            </Button>
            <Button
              className={`sidebar-btn${currentView === 'opret' ? ' active' : ''}`}
              onClick={() => setCurrentView('opret')}
            >
              Opret
            </Button>
            <Button
              className={`sidebar-btn${currentView === 'forecast' ? ' active' : ''}`}
              onClick={() => setCurrentView('forecast')}
            >
              Forecast
            </Button>
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

          <main className="main-content">{renderMainContent()}</main>
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
