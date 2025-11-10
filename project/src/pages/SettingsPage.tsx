import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import Layout from '../components/Layout'
import './SettingsPage.css'

export default function SettingsPage() {
  const { profile, refreshProfile } = useAuth()
  const [name, setName] = useState('')
  const [timezone, setTimezone] = useState('UTC')
  const [country, setCountry] = useState('')
  const [isAnonymousHandle, setIsAnonymousHandle] = useState(false)
  const [anonymousHandle, setAnonymousHandle] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (profile) {
      setName(profile.name)
      setTimezone(profile.timezone)
      setCountry(profile.country || '')
      setIsAnonymousHandle(profile.is_anonymous_handle)
      setAnonymousHandle(profile.anonymous_handle || '')
    }
  }, [profile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { error } = await supabase
        .from('users')
        .update({
          name,
          timezone,
          country: country || null,
          is_anonymous_handle: isAnonymousHandle,
          anonymous_handle: isAnonymousHandle ? anonymousHandle || null : null,
        })
        .eq('id', profile?.id)

      if (error) throw error

      await refreshProfile()
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Layout title="Settings">
      <div className="settings-page">
        <div className="settings-section card">
          <h3>Profile</h3>
          <form onSubmit={handleSubmit}>
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

            <div className="form-group">
              <label className="form-label">Email (read-only)</label>
              <input type="email" className="form-input" value={profile?.email || ''} disabled />
            </div>

            <div className="form-group">
              <label className="form-label">Timezone</label>
              <select className="form-input" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time (US)</option>
                <option value="America/Chicago">Central Time (US)</option>
                <option value="America/Denver">Mountain Time (US)</option>
                <option value="America/Los_Angeles">Pacific Time (US)</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Asia/Tokyo">Tokyo</option>
                <option value="Australia/Sydney">Sydney</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Country (optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="United States"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
            </button>
          </form>
        </div>

        <div className="settings-section card">
          <h3>Privacy & Anonymity</h3>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isAnonymousHandle}
                onChange={(e) => setIsAnonymousHandle(e.target.checked)}
              />
              <span>Use anonymous handle in communities</span>
            </label>
          </div>

          {isAnonymousHandle && (
            <div className="form-group">
              <label className="form-label">Anonymous Handle</label>
              <input
                type="text"
                className="form-input"
                placeholder="Choose a handle"
                value={anonymousHandle}
                onChange={(e) => setAnonymousHandle(e.target.value)}
              />
              <p className="form-help">This name will be displayed instead of your real name in community posts.</p>
            </div>
          )}
        </div>

        <div className="disclaimer-section">
          <div className="disclaimer">
            <h4>Safety Reminder</h4>
            <p className="disclaimer-text">
              Niramaya is a support tool, not medical care. Always contact a professional for diagnosis or treatment. In
              case of emergency, contact your local crisis services immediately.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
