import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import Layout from '../components/Layout'
import './CommunityListPage.css'

interface Community {
  id: string
  name: string
  description: string
  is_private: boolean
  member_count?: number
  is_member?: boolean
}

export default function CommunityListPage() {
  const { profile } = useAuth()
  const [communities, setCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCommunities()
  }, [])

  const fetchCommunities = async () => {
    try {
      const { data: communitiesData, error: communitiesError } = await supabase
        .from('communities')
        .select('*')
        .eq('is_private', false)

      if (communitiesError) throw communitiesError

      const { data: memberships, error: membershipsError } = await supabase
        .from('community_memberships')
        .select('community_id')
        .eq('user_id', profile?.id)

      if (membershipsError) throw membershipsError

      const membershipIds = new Set(memberships?.map((m) => m.community_id) || [])

      const enrichedCommunities = (communitiesData || []).map((community) => ({
        ...community,
        is_member: membershipIds.has(community.id),
      }))

      setCommunities(enrichedCommunities)
    } catch (error) {
      console.error('Error fetching communities:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleJoin = async (communityId: string) => {
    try {
      const { error } = await supabase.from('community_memberships').insert([
        {
          community_id: communityId,
          user_id: profile?.id,
          role: 'member',
        },
      ])

      if (error) throw error
      await fetchCommunities()
    } catch (error) {
      console.error('Error joining community:', error)
    }
  }

  return (
    <Layout title="Communities">
      <div className="community-list-page">
        <p className="subtitle">Anonymous peer support spaces</p>

        {loading ? (
          <p>Loading communities...</p>
        ) : (
          <div className="communities-grid">
            {communities.map((community) => (
              <div key={community.id} className="community-card card">
                <h3>{community.name}</h3>
                <p className="community-description">{community.description}</p>
                {community.is_member ? (
                  <Link to={`/app/communities/${community.id}`} className="btn btn-primary">
                    View Community
                  </Link>
                ) : (
                  <button onClick={() => handleJoin(community.id)} className="btn btn-secondary">
                    Join Community
                  </button>
                )}
              </div>
            ))}

            {communities.length === 0 && (
              <p className="empty-state">No communities available yet. Check back soon!</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}
