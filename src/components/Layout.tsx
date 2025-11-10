import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Layout.css'

interface LayoutProps {
  children: React.ReactNode
  title?: string
}

export default function Layout({ children, title }: LayoutProps) {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="layout">
      <nav className="layout-nav">
        <div className="layout-nav-content">
          <Link to="/app/home" className="layout-logo">
            Niramaya
          </Link>
          <div className="layout-nav-links">
            {profile?.role === 'Provider' && (
              <Link to="/provider/dashboard" className="nav-link">
                Dashboard
              </Link>
            )}
            <Link to="/app/communities" className="nav-link">
              Communities
            </Link>
            <Link to="/app/settings" className="nav-link">
              Settings
            </Link>
            <button onClick={handleSignOut} className="btn btn-secondary btn-small">
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="layout-main">
        <div className="layout-container">
          {title && <h1 className="layout-title">{title}</h1>}
          {children}
        </div>
      </main>
    </div>
  )
}
