import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import UserHome from './pages/UserHome'
import CompanionChat from './pages/CompanionChat'
import JournalPage from './pages/JournalPage'
import CrisisPage from './pages/CrisisPage'
import CommunityListPage from './pages/CommunityListPage'
import CommunityDetailPage from './pages/CommunityDetailPage'
import ProviderDashboard from './pages/ProviderDashboard'
import ProviderClientDetail from './pages/ProviderClientDetail'
import SettingsPage from './pages/SettingsPage'

function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return <div className="loading-screen">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  if (requiredRole && profile?.role !== requiredRole) {
    return <Navigate to="/app/home" replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="loading-screen">Loading...</div>
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/app/home" /> : <LandingPage />} />
      <Route path="/auth" element={user ? <Navigate to="/app/home" /> : <AuthPage />} />

      <Route
        path="/app/home"
        element={
          <ProtectedRoute>
            <UserHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/chat"
        element={
          <ProtectedRoute>
            <CompanionChat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/journal"
        element={
          <ProtectedRoute>
            <JournalPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/crisis"
        element={
          <ProtectedRoute>
            <CrisisPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/communities"
        element={
          <ProtectedRoute>
            <CommunityListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/communities/:id"
        element={
          <ProtectedRoute>
            <CommunityDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/provider/dashboard"
        element={
          <ProtectedRoute requiredRole="Provider">
            <ProviderDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/provider/client/:id"
        element={
          <ProtectedRoute requiredRole="Provider">
            <ProviderClientDetail />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
