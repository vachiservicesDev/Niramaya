import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { UserRole } from '../lib/supabase'
import './AuthPage.css'

export default function AuthPage() {
  const [searchParams] = useSearchParams()
  const isProviderMode = searchParams.get('mode') === 'provider'

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState<UserRole>(isProviderMode ? 'Provider' : 'User')
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)
  const [emergencyContactName, setEmergencyContactName] = useState('')
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('')
  const [permissions, setPermissions] = useState({
    dataProcessing: false,
    notifications: false,
  })
  const [loading, setLoading] = useState(false)

  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (isLogin) {
      try {
        await signIn(email, password)
        navigate('/app/home')
      } catch (err: any) {
        setError(err.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
      return
    }

    if (step === 1) {
      setStep(2)
      setLoading(false)
    } else if (step === 2) {
      try {
        await signUp(email, password, name, role, {
          emergencyContactName,
          emergencyContactPhone,
          permissions,
        })
        navigate('/app/home')
      } catch (err: any) {
        setError(err.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
  }

  const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setPermissions((prev) => ({ ...prev, [name]: checked }))
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Niramaya</h1>
          <p>Your mental wellness companion</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Log In
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          {isLogin || step === 1 ? (
            <>
              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">I am a:</label>
                  <div className="role-selector">
                    <label className="role-option">
                      <input
                        type="radio"
                        name="role"
                        value="User"
                        checked={role === 'User'}
                        onChange={(e) => setRole(e.target.value as UserRole)}
                      />
                      <span>User (seeking support)</span>
                    </label>
                    <label className="role-option">
                      <input
                        type="radio"
                        name="role"
                        value="Provider"
                        checked={role === 'Provider'}
                        onChange={(e) => setRole(e.target.value as UserRole)}
                      />
                      <span>Provider (mental health professional)</span>
                    </label>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label">Emergency Contact Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={emergencyContactName}
                  onChange={(e) => setEmergencyContactName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Emergency Contact Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  value={emergencyContactPhone}
                  onChange={(e) => setEmergencyContactPhone(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Permissions & Consent</label>
                <div className="permission-selector">
                  <label className="permission-option">
                    <input
                      type="checkbox"
                      name="dataProcessing"
                      checked={permissions.dataProcessing}
                      onChange={handlePermissionChange}
                    />
                    <span>I consent to the processing of my data for service delivery.</span>
                  </label>
                  <label className="permission-option">
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={permissions.notifications}
                      onChange={handlePermissionChange}
                    />
                    <span>I agree to receive notifications and reminders.</span>
                  </label>
                </div>
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Log In' : step === 1 ? 'Continue' : 'Complete Sign Up'}
          </button>

          {!isLogin && step === 2 && (
            <button
              type="button"
              className="btn btn-secondary btn-full"
              onClick={() => setStep(1)}
              disabled={loading}
            >
              Back
            </button>
          )}
        </form>

        <div className="disclaimer">
          <p className="disclaimer-text">
            By continuing, you acknowledge that Niramaya is not a substitute for professional medical care.
            In case of emergency, contact local crisis services.
          </p>
        </div>
      </div>
    </div>
  )
}
