import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import Layout from '../components/Layout'
import './ProviderClientDetail.css'

interface ClientInfo {
  id: string
  name: string
  email: string
}

interface JournalEntry {
  id: string
  text: string
  mood: string
  created_at: string
  ai_risk_score: number | null
}

export default function ProviderClientDetail() {
  const { id } = useParams<{ id: string }>()
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [client, setClient] = useState<ClientInfo | null>(null)
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      verifyAccessAndFetchData()
    }
  }, [id])

  const verifyAccessAndFetchData = async () => {
    try {
      const { data: link, error: linkError } = await supabase
        .from('provider_client_links')
        .select('*')
        .eq('provider_id', profile?.id)
        .eq('client_id', id)
        .eq('status', 'active')
        .maybeSingle()

      if (linkError || !link) {
        navigate('/provider/dashboard')
        return
      }

      const { data: clientData, error: clientError } = await supabase
        .from('users')
        .select('id, name, email')
        .eq('id', id)
        .maybeSingle()

      if (clientError) throw clientError
      setClient(clientData)

      const { data: entriesData, error: entriesError } = await supabase
        .from('journal_entries')
        .select('id, text, mood, created_at, ai_risk_score')
        .eq('user_id', id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (entriesError) throw entriesError
      setEntries(entriesData || [])
    } catch (error) {
      console.error('Error fetching client data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <p>Loading client data...</p>
      </Layout>
    )
  }

  if (!client) {
    return (
      <Layout>
        <p>Client not found</p>
      </Layout>
    )
  }

  return (
    <Layout title={`Client: ${client.name}`}>
      <div className="provider-client-detail">
        <div className="client-info card">
          <h3>Client Information</h3>
          <div className="info-row">
            <span className="info-label">Name:</span>
            <span>{client.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span>{client.email}</span>
          </div>
        </div>

        <div className="timeline-section">
          <div className="section-header">
            <h3>Recent Journal Entries</h3>
            <button className="btn btn-secondary btn-small" disabled>
              Generate Report
            </button>
          </div>

          {entries.length === 0 ? (
            <p className="empty-state">No journal entries available yet.</p>
          ) : (
            <div className="timeline">
              {entries.map((entry) => (
                <div key={entry.id} className="timeline-item card">
                  <div className="timeline-header">
                    <span className={`mood-badge mood-${entry.mood}`}>{entry.mood.replace('_', ' ')}</span>
                    <span className="timeline-date">{new Date(entry.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="timeline-text">{entry.text}</p>
                  {entry.ai_risk_score !== null && (
                    <div className="risk-indicator">
                      <span className="risk-label">Risk Score:</span>
                      <span className={`risk-value ${entry.ai_risk_score > 70 ? 'high' : entry.ai_risk_score > 40 ? 'medium' : 'low'}`}>
                        {entry.ai_risk_score}/100
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
