import { useState } from 'react'
import type { CSSProperties } from 'react'
import logo from '../../assets/svendborgpng.png'
import Button from '../../components/Button'
import CreateAppointmentForm, { type NewAppointment } from '../../components/CreateAppointmentForm'
import CreateUserForm, { type NewUser } from '../../components/CreateUserForm'
import List from '../../components/ListView'
import TestComponent from '../../components/TestComponent'
import useAppNavigation from '../../hooks/useAppNavigation'

type DashboardView = 'oversigt' | 'opret' | 'opretAftale' | 'test' | 'forecast'

type UserItem = {
  id: number
  fullName: string
  password: string
}

type AppointmentItem = NewAppointment & {
  id: number
}

function DashboardPage() {
  const { goToLogin } = useAppNavigation()
  const [currentView, setCurrentView] = useState<DashboardView>('oversigt')
  const [users, setUsers] = useState<UserItem[]>([])
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null)
  const [appointments, setAppointments] = useState<AppointmentItem[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentItem | null>(null)

  const sidebarIndicatorIndex =
    currentView === 'oversigt' ? 0 :
      currentView === 'opret' ? 1 :
        currentView === 'opretAftale' ? 2 :
          currentView === 'test' ? 3 :
            4

  const sidebarStyle = {
    '--active-index': sidebarIndicatorIndex,
  } as CSSProperties

  const handleCreateUser = (newUser: NewUser) => {
    const userToAdd: UserItem = {
      id: Date.now(),
      fullName: newUser.fullName,
      password: newUser.password,
    }

    setUsers((previousUsers) => [...previousUsers, userToAdd])
    setCurrentView('oversigt')
  }

  const handleCreateAppointment = (newAppointment: NewAppointment) => {
    const appointmentToAdd: AppointmentItem = {
      id: Date.now(),
      ...newAppointment,
    }

    setAppointments((previousAppointments) => [...previousAppointments, appointmentToAdd])
    setCurrentView('oversigt')
  }

  const renderMainContent = () => {
    if (currentView === 'opret') {
      return <CreateUserForm onCreateUser={handleCreateUser} />
    }

    if (currentView === 'opretAftale') {
      return <CreateAppointmentForm onCreateAppointment={handleCreateAppointment} />
    }

    if (currentView === 'forecast') {
      return <p className="main-placeholder">Forecast side kommer forhåbentlig snart</p>
    }

    if (currentView === 'test') {
      return <TestComponent />
    }

    return (
      <section>
        <h2 className="overview-title">Brugere</h2>
        {users.length === 0 ? (
          <p className="main-placeholder">Ingen burger endnu. Klik på Opret bruger for at tilføje en burger.</p>
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
        <h2 className="overview-title">Aftaler</h2>
        {appointments.length === 0 ? (
          <p className="main-placeholder">Ingen aftaler endnu. Klik på Opret aftale for at tilføje en aftale.</p>
        ) : (
          <List
            items={appointments}
            keyExtractor={(appointment) => appointment.id}
            onSelectionChange={(appointment) => setSelectedAppointment(appointment)}
            renderItem={(appointment, isSelected) => (
              <div className={`user-row${isSelected ? ' selected' : ''}`}>
                <span>
                  {appointment.arrivalTime.toLocaleString()} | {appointment.protocol}
                  {appointment.isUrgent ? ' | Akut' : ''}
                </span>
              </div>
            )}
          />
        )}
        {selectedAppointment && (
          <p className="selected-user-text">
            Valgt aftale: {selectedAppointment.protocol} ({selectedAppointment.scheduleTime} min)
          </p>
        )}
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
          <div className="sidebar-buttons" style={sidebarStyle}>
            <span className="sidebar-indicator" aria-hidden="true" />
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
              Opret bruger
            </Button>
            <Button
              className={`sidebar-btn${currentView === 'opretAftale' ? ' active' : ''}`}
              onClick={() => setCurrentView('opretAftale')}
            >
              Opret aftale
            </Button>
            <Button
              className={`sidebar-btn${currentView === 'test' ? ' active' : ''}`}
              onClick={() => setCurrentView('test')}
            >
              Test
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
