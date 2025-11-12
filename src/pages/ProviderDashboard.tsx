import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import Layout from '../components/Layout'
import './ProviderDashboard.css'

interface Client {
  id: string
  name: string
  email: string
  last_mood?: string
  entry_count?: number
  created_at: string
}

export default function ProviderDashboard() {
  const { profile } = useAuth()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ totalClients: 0, totalEntries: 0, activeCrises: 0 })

  useEffect(() => {
    fetchClients()
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const { data: links } = await supabase
        .from('provider_client_links')
        .select('client_id')
        .eq('provider_id', profile?.id)
        .eq('status', 'active')

      const clientIds = (links || []).map((link: any) => link.client_id)

      if (clientIds.length > 0) {
        const { count: entriesCount } = await supabase
          .from('journal_entries')
          .select('*', { count: 'exact', head: true })
          .in('user_id', clientIds)

        const { data: crises } = await supabase
          .from('crisis_check_ins')
          .select('id')
          .in('user_id', clientIds)
          .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

        setStats({
          totalClients: clientIds.length,
          totalEntries: entriesCount || 0,
          activeCrises: crises?.length || 0,
        })
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchClients = async () => {
    try {
      const { data: links, error: linksError } = await supabase
        .from('provider_client_links')
        .select('client_id, users(id, name, email, created_at)')
        .eq('provider_id', profile?.id)
        .eq('status', 'active')

      if (linksError) throw linksError

      const clientsData = (links || []).map((link: any) => ({
        id: link.users.id,
        name: link.users.name,
        email: link.users.email,
        created_at: link.users.created_at,
      }))

      setClients(clientsData)
    } catch (error) {
      console.error('Error fetching clients:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Provider Dashboard">
      <div className="provider-dashboard">
        <p className="subtitle">Overview of your Niramaya clients</p>

        {clients.length > 0 && (
          <div className="stats-grid">
            <div className="stat-card card">
              <div className="stat-value">{stats.totalClients}</div>
              <div className="stat-label">Active Clients</div>
            </div>
            <div className="stat-card card">
              <div className="stat-value">{stats.totalEntries}</div>
              <div className="stat-label">Total Journal Entries</div>
            </div>
            <div className="stat-card card">
              <div className="stat-value">{stats.activeCrises}</div>
              <div className="stat-label">Crisis Check-ins (7 days)</div>
            </div>
          </div>
        )}

        {loading ? (
          <p>Loading clients...</p>
        ) : clients.length === 0 ? (
          <div className="empty-state card">
            <h3>No clients yet</h3>
            <p>Clients will appear here once they accept your invitation and you establish an active connection.</p>
          </div>
        ) : (
          <div className="clients-table">
            <table>
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Email</th>
                  <th>Member Since</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{new Date(client.created_at).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/provider/client/${client.id}`} className="btn btn-primary btn-small">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  )
}
